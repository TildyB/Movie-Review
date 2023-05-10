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
exports.disconnect = exports.cleanData = exports.connect = void 0;
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
let mongoDb;
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    mongoDb = yield mongodb_memory_server_1.MongoMemoryServer.create();
    const uri = mongoDb.getUri();
    mongoose_1.default.set('strictQuery', false);
    yield mongoose_1.default.connect(uri);
});
exports.connect = connect;
const cleanData = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.db.dropDatabase();
});
exports.cleanData = cleanData;
const disconnect = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.disconnect();
    yield mongoDb.stop();
});
exports.disconnect = disconnect;
