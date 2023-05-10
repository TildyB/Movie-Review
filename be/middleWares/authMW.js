
const jwt = require("jsonwebtoken");
const { env } = require("../utilities/envParser");


const authMW = (req, res, next) => {
    const token = req.headers.authorization
    try {
        const decoded =jwt.verify(token, env.JWT_SECRET_KEY)
        // res.locals.sub = decoded.user.sub  //ezt kell hasznalni a reviewer azonositasahoz minden postolasnal, gettelesnel
        next ()

    } catch (err) {
        return res.sendStatus(403)

    }
}
 
module.exports = authMW;