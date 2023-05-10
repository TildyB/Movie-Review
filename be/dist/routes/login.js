"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verify_1 = require("../middleWares/verify");
const safeParseFc_1 = require("../utilities/safeParseFc");
const zod_1 = require("zod");
const google_1 = require("../api/google");
const user_1 = require("../models/user");
const envParser_1 = require("../utilities/envParser");
const router = express_1.default.Router();
if (!envParser_1.env.JWT_SECRET_KEY)
    throw "Secret Key is required";
const LoginRequestSchema = zod_1.z.object({
    code: zod_1.z.string(),
});
const Payload = zod_1.z.object({
    name: zod_1.z.string(),
    sub: zod_1.z.string(),
    email: zod_1.z.string().email(),
});
router.post("/", (0, verify_1.verify)(LoginRequestSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("login");
    const loginRequest = req.body;
    const idToken = yield (0, google_1.getIdToken)(loginRequest.code);
    if (!idToken)
        return res.status(401);
    const payload = jsonwebtoken_1.default.decode(idToken);
    const result = (0, safeParseFc_1.safeParseFc)(Payload, payload);
    if (!result) {
        return res.sendStatus(500);
    }
    const data = result;
    const user = yield user_1.User.findOne({ sub: data.sub });
    if (!user) {
        const newUser = yield user_1.User.create(data);
        const sessionToken = jsonwebtoken_1.default.sign({ newUser }, envParser_1.env.JWT_SECRET_KEY);
        return res.send({ sessionToken, username: newUser.name });
    }
    const sessionToken = jsonwebtoken_1.default.sign({ user }, envParser_1.env.JWT_SECRET_KEY);
    res.send({ sessionToken, username: user.name });
}));
exports.default = router;
