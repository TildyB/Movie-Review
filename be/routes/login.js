const express = require("express");
const jwt = require("jsonwebtoken");
const { verify } = require("../middleWares/verify");
const { safeParseFc } = require("../utilities/safeParseFc");
const { z } = require("zod");
const { getIdToken } = require("../token/google");
const  User = require("../models/user");
const { env } = require("../utilities/envParser");


const router = express.Router();

if (!env.JWT_SECRET_KEY) throw "Secret Key is required";

const LoginRequestSchema = z.object({
  code: z.string(),
});

  
const Payload = z.object({
  name: z.string(),
  sub: z.string(),
  email: z.string().email(),
});


router.post("/", verify(LoginRequestSchema), async (req, res) => {
  const loginRequest = req.body
  const idToken = await getIdToken(loginRequest.code);
  if (!idToken) return res.status(401);
  const payload = jwt.decode(idToken);
  const result = safeParseFc(Payload, payload);

  if (!result) {
    return res.sendStatus(500);
  }
  
  const data = result
  const user = await User.findOne({sub: data.sub})

  
  if (!user) {
    const newUser = await User.create(data) 
    const sessionToken = jwt.sign({newUser}, env.JWT_SECRET_KEY);
    return res.send({sessionToken, username: newUser.name});
  }  
  const sessionToken = jwt.sign({user}, env.JWT_SECRET_KEY);
  res.send({sessionToken, username: user.name});
});
module.exports = router;