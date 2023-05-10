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
const supertest_1 = __importDefault(require("supertest"));
const mongodb_memory_test_helper_1 = require("../mongodbMemoryServer/mongodb.memory.test.helper");
const app_1 = __importDefault(require("../app"));
describe('Name Target Controller', () => {
    beforeAll(mongodb_memory_test_helper_1.connect);
    beforeEach(mongodb_memory_test_helper_1.cleanData);
    afterAll(mongodb_memory_test_helper_1.disconnect);
    it("should return 200 if movie doesn't exist in db", () => __awaiter(void 0, void 0, void 0, function* () {
        // given 
        const testData = {
            title: "KOKAIN MACI 4",
            id: 12345,
            poster_path: "KEP.jpg",
            adult: true,
            release_date: "2022-12-12",
            overview: "Awesome movie description",
            vote_average: 8,
            review: {
                reviewer: "Mikorka Kálmán",
                text: "egy szar",
            },
        };
        // when 
        const response = yield (0, supertest_1.default)(app_1.default).post("/api/reviews").send(testData);
        // then
        expect(response.status).toBe(200);
    }));
    it("should return 200 if movie doesn't exist in db", () => __awaiter(void 0, void 0, void 0, function* () {
        // given 
        const testData = {
            title: "KOKAIN MACI 4",
            id: 12345,
            poster_path: "KEP.jpg",
            adult: true,
            release_date: "2022-12-12",
            overview: "Awesome movie description",
            vote_average: 8,
            review: {
                reviewer: "Mikorka Kálmán",
                text: "egy szar",
            },
        };
        yield (0, supertest_1.default)(app_1.default).post("/api/reviews").send(testData);
        // when
        const response = yield (0, supertest_1.default)(app_1.default).post("/api/reviews").send(testData); // ez lesz a 2. futas (update)
        // then
        expect(response.status).toBe(200); // DB-t meg a res.body-t is ellenorizni kene
    }));
});
