import mongoose from "mongoose";
import { Schema , InferSchemaType} from "mongoose";

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

export type RevMovieType = InferSchemaType<typeof revMovieSchema>
export const Movie = mongoose.model('Review', revMovieSchema)