const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    origin: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    to: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    message: String,

}, {timestamps: true})

const messageModel = mongoose.model('Message', messageSchema);
module.exports = {messageModel};
