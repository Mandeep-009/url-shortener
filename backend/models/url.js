const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    coding : {
        type: String,
        required: true,
        unique: true
    },
    url : {
        type: String,
        required: true,
        unique: true
    }
})

const short_url = mongoose.model('short_url',urlSchema);
module.exports = short_url;