
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const revMovieSchema = new Schema({
    title: String,
    id: Number, //  id from API
    poster_path: String,
    backdrop_path: String,
    adult: Boolean,
    release_date: String,
    overview: String,
    vote_average: Number,
    reviews: [
        {
            reviewer: String, // name helyett sub kellene, amit auth-olok az auth MW-vel, A tokenbol fe-n kiszedett sub kell
            text: String,
            
        }
    ]
})

module.exports = mongoose.model('Review', revMovieSchema);