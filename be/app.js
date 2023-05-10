require('dotenv').config();
const express = require('express');
const login = require('./routes/login');
const reviews = require('./routes/reviews');
const cors = require('cors');

const app = express();

app.use(cors())
app.use(express.json());
app.use('/api/login', login)
app.use('/api/reviews', reviews)





module.exports = app;
