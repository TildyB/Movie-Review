
const dotenv = require("dotenv");
dotenv.config();

const { env } = require("../utilities/envParser");
const app = require("../app");
const mongoose = require("mongoose");

mongoose.connect(env.MONGO_URL)
app.listen(env.PORT, () => console.log(`Server running at port ${env.PORT} for Movie reviews`))