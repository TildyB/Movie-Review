
const express = require("express")
const router = express.Router()
const { z } = require("zod");
const  Movie  = require("../models/movies");
const { verify } = require("../middleWares/verify");



const revZodSchema = z.object({
    title: z.string(),
    id: z.number(),
    poster_path: z.string(),
    backdrop_path: z.string(),
    adult: z.boolean(),
    release_date: z.string(),
    overview: z.string(),
    vote_average: z.number(),
    review: z.object({
        reviewer: z.string(), // name
        text: z.string(),
    })
})


router.post('/', verify(revZodSchema), async (req, res) => {
    const result = req.body
    const movie = await Movie.findOne({ id: result.id })
    if (!movie) {
        const newMovie = await Movie.create({
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
        }) 
        return res.send(newMovie)
    }

    const updatedMovie = await Movie.findOneAndUpdate({ id: result.id }, { $push: { reviews: [result.review] } })
    res.send(updatedMovie)
})

router.get('/movies', async (req, res) => {
    if (req.query.id) {
        const id = parseInt(req.query.id )
        if(!id) return res.sendStatus(400)

        const movie = await Movie.findOne({ id })
        if (!movie) return res.sendStatus(404)
        return res.json(movie)
    }
    res.send([])
})

router.get('/reviewer', async (req, res) => {
    if (req.query.name) {
        const name = req.query.name
        // User.find({ username: {$regex : "^" + req.params.username}});
        const movies = await Movie.find({ "reviews.reviewer": {$regex : "^" + name} })
        if (!movies.length) return res.sendStatus(404)
        return res.json(movies)
    }
    res.send([])
})


module.exports = router