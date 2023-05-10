"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = void 0;
const safeParseFc_1 = require("../utilities/safeParseFc");
const verify = (schema) => (req, res, next) => {
    const result = (0, safeParseFc_1.safeParseFc)(schema, req.body);
    if (!result)
        return res.sendStatus(400);
    next();
};
exports.verify = verify;
