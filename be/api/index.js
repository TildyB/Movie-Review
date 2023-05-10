
const dotenv = require("dotenv");
dotenv.config();

const { env } = require("../utilities/envParser");

const mongoose = require("mongoose");
const express = require('express');
const login = require('../routes/login');
const reviews = require('../routes/reviews');
const cors = require('cors');

const app = express();

app.use(cors())
app.use(express.json());
app.use('/api/login', login)
app.use('/api/reviews', reviews)



mongoose.connect(env.MONGO_URL)
app.listen(env.PORT, () => console.log(`Server running at port ${env.PORT} for Movie reviews`))