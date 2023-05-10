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
const zod_1 = require("zod");
const movies_1 = require("../models/movies");
const verify_1 = require("../middleWares/verify");
const router = express_1.default.Router();
const revZodSchema = zod_1.z.object({
    title: zod_1.z.string(),
    id: zod_1.z.number(),
    poster_path: zod_1.z.string(),
    backdrop_path: zod_1.z.string(),
    adult: zod_1.z.boolean(),
    release_date: zod_1.z.string(),
    overview: zod_1.z.string(),
    vote_average: zod_1.z.number(),
    review: zod_1.z.object({
        reviewer: zod_1.z.string(),
        text: zod_1.z.string(),
    })
});
const findMovieSchema = zod_1.z.number();
const findReviewerSchema = zod_1.z.string();
router.post('/', (0, verify_1.verify)(revZodSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = req.body;
    const movie = yield movies_1.Movie.findOne({ id: result.id });
    if (!movie) {
        const newMovie = yield movies_1.Movie.create({
            title: result.title,
            id: result.id,
            poster_path: result.poster_path,
            backdrop_path: result.backdrop_path,
            adult: result.adult,
            release_date: result.release_date,
            overview: result.overview,
            vote_average: result.vote_average,
            reviews: [
                result.review // ebben a reviewer-t mi adjuk meg a sub kereses alapjan
            ]
        });
        return res.send(newMovie);
    }
    const updatedMovie = yield movies_1.Movie.findOneAndUpdate({ id: result.id }, { $push: { reviews: [result.review] } });
    res.send(updatedMovie);
}));
router.get('/movies', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.query.id) {
        const id = parseInt(req.query.id);
        if (!id)
            return res.sendStatus(400);
        const movie = yield movies_1.Movie.findOne({ id });
        if (!movie)
            return res.sendStatus(404);
        return res.json(movie);
    }
    res.send([]);
}));
router.get('/reviewer', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.query.name) {
        const name = req.query.name;
        // User.find({ username: {$regex : "^" + req.params.username}});
        const movies = yield movies_1.Movie.find({ "reviews.reviewer": { $regex: "^" + name } });
        if (!movies.length)
            return res.sendStatus(404);
        return res.json(movies);
    }
    res.send([]);
}));
exports.default = router;
