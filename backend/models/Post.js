const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    image: String,
    likes: Number,
    comments: Number,
    description: String,

}, {timestamps: true})

const postModel = mongoose.model('Post', postSchema);
module.exports = {postModel};