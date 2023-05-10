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
const app_1 = __importDefault(require("../app"));
const supertest_1 = __importDefault(require("supertest"));
const dotenv_1 = __importDefault(require("dotenv"));
jest.mock("../api/google");
const google_1 = require("../api/google");
dotenv_1.default.config();
// dotenv.config({
//     path: '../.env.test'
// });
const request = (0, supertest_1.default)(app_1.default);
it("gets the test endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield request.post("/api/login");
    expect(response.status).toBe(400);
}));
it("should return a valid mocked response ", () => __awaiter(void 0, void 0, void 0, function* () {
    // Given
    const mockedGetIdToken = jest.mocked(google_1.getIdToken);
    mockedGetIdToken.mockResolvedValueOnce("mocked id_token");
    const testData = "mocked auth_code";
    // When
    const response = yield (0, google_1.getIdToken)(testData);
    // Then
    expect(response).toBe("mocked id_token");
}));
