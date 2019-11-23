'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const ThemeSchema = new Schema({
        name: String,
        questions: [
            Number,
        ],
        article: String,
        status: Number,
        createTS: Number,
        lastModifiedTS: Number,
    });
    return mongoose.model('Theme', ThemeSchema);
};
