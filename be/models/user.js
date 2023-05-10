
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: String,
    sub: String,
    email: {type: String, required: true}

})


module.exports = mongoose.model('User', userSchema);
