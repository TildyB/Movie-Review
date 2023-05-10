import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../utilities/envParser'


const authMW = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization as string
    try {
        const decoded =jwt.verify(token, env.JWT_SECRET_KEY)
        // res.locals.sub = decoded.user.sub  //ezt kell hasznalni a reviewer azonositasahoz minden postolasnal, gettelesnel
        next ()

    } catch (err) {
        console.log(err);
        return res.sendStatus(403)

    }
}
 
module.exports = authMW;