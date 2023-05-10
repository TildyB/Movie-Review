"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envParser_1 = require("../utilities/envParser");
const authMW = (req, res, next) => {
    const token = req.headers.authorization;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, envParser_1.env.JWT_SECRET_KEY);
        // res.locals.sub = decoded.user.sub  //ezt kell hasznalni a reviewer azonositasahoz minden postolasnal, gettelesnel
        next();
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(403);
    }
};
module.exports = authMW;
