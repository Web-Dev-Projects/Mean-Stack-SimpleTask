const mongoose = require('mongoose');

module.exports = mongoose.model('Item',
    new mongoose.Schema({
        name: String,
        vendorName: String,
        description: String,
        imgFileSrc: String,
        exeFileSrc: String,
        exeFileSize: Number,
        downloadsNum: Number,
        comments: [{ username: String, text: String }],
        ratings: [{ username: String, value: Number }],
    }));