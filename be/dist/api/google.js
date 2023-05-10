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
exports.getIdToken = void 0;
const axios_1 = __importDefault(require("axios"));
const zod_1 = require("zod");
const envParser_1 = require("../utilities/envParser");
const url = "https://oauth2.googleapis.com/token";
const Response = zod_1.z.object({
    id_token: zod_1.z.string(),
    access_token: zod_1.z.string(),
    // refresh_token: z.string(),
    expires_in: zod_1.z.number(),
    scope: zod_1.z.string(),
    token_type: zod_1.z.literal("Bearer")
});
const getIdToken = (code) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("code", code);
    console.log("env.CLIENT_ID", envParser_1.env.CLIENT_ID);
    console.log("env.CLIENT_SECRET", envParser_1.env.CLIENT_SECRET);
    console.log("env.REDIRECT_URI", envParser_1.env.REDIRECT_URI);
    try {
        const response = yield axios_1.default.post(url, {
            client_id: envParser_1.env.CLIENT_ID,
            client_secret: envParser_1.env.CLIENT_SECRET,
            redirect_uri: envParser_1.env.REDIRECT_URI,
            code,
            grant_type: "authorization_code"
        });
        console.log("response", response);
        const result = Response.safeParse(response.data);
        if (result.success === false) {
            console.log("getIDToken safeParse error");
            return null;
        }
        return result.data.id_token;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.getIdToken = getIdToken;
