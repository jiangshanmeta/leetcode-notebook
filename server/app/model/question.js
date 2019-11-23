'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const QuestionSchema = new Schema({
        _id: Number,
        title: String,
        title_slug: String,
        difficulty: Number,
    });
    return mongoose.model('Question', QuestionSchema);
};
