"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const revMovieSchema = new mongoose_2.Schema({
    title: String,
    id: Number,
    poster_path: String,
    backdrop_path: String,
    adult: Boolean,
    release_date: String,
    overview: String,
    vote_average: Number,
    reviews: [
        {
            reviewer: String,
            text: String,
        }
    ]
});
exports.Movie = mongoose_1.default.model('Review', revMovieSchema);
