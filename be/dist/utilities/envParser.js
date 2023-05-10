"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    CLIENT_ID: zod_1.z.string(),
    CLIENT_SECRET: zod_1.z.string(),
    PORT: zod_1.z.string().min(1),
    MONGO_URL: zod_1.z.string().min(1),
    REDIRECT_URI: zod_1.z.string(),
    JWT_SECRET_KEY: zod_1.z.string()
});
exports.env = envSchema.parse(process.env);
