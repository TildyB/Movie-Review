"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const envParser_1 = require("./utilities/envParser");
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect(envParser_1.env.MONGO_URL);
app_1.default.listen(envParser_1.env.PORT, () => console.log(`Server running at port ${envParser_1.env.PORT} for Movie reviews`));
