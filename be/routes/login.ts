import express, { Express, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { verify } from "../middleWares/verify";
import { safeParseFc } from "../utilities/safeParseFc";
import { z } from "zod";
import { getIdToken } from "../api/google";
import { User, UserType} from "../models/user"
import { env } from "../utilities/envParser";

const router = express.Router();

if (!env.JWT_SECRET_KEY) throw "Secret Key is required";

const LoginRequestSchema = z.object({
  code: z.string(),
});
type LoginRequest = z.infer<typeof LoginRequestSchema>;
  
const Payload = z.object({
  name: z.string(),
  sub: z.string(),
  email: z.string().email(),
});
type Payload = z.infer<typeof Payload>;

router.post("/", verify(LoginRequestSchema), async (req: Request, res: Response) => {
  console.log("login")
  const loginRequest = req.body as LoginRequest
  const idToken = await getIdToken(loginRequest.code);
  if (!idToken) return res.status(401);
  const payload: unknown = jwt.decode(idToken);
  const result = safeParseFc(Payload, payload);
  
  if (!result) {
    return res.sendStatus(500);
  }
  
  const data = result
  const user = await User.findOne({sub: data.sub})

  
  if (!user) {
    const newUser = await User.create(data) as UserType
    const sessionToken = jwt.sign({newUser}, env.JWT_SECRET_KEY);
    return res.send({sessionToken, username: newUser.name});
  }  
  const sessionToken = jwt.sign({user}, env.JWT_SECRET_KEY);
  res.send({sessionToken, username: user.name});
});
export default router;