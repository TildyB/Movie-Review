
import dotenv from "dotenv"
dotenv.config()

import { env } from "./utilities/envParser"
import app from "./app"
import mongoose from "mongoose"

mongoose.connect(env.MONGO_URL)
app.listen(env.PORT, () => console.log(`Server running at port ${env.PORT} for Movie reviews`))