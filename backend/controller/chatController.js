const { authenticate } = require('../middleware/middleware.js');
const { messageModel } = require('../models/Message.js');

async function messages(req, res) {
    const { userID } = req.params;
    const user = await authenticate(req);
    const targetUserID = user.userID
    const messages = await messageModel.find({
        origin:{$in:[userID, targetUserID]},
        to:{$in:[userID, targetUserID]},
    }).sort({createdAt: 1});
    res.json(messages);
}

module.exports = {
    messages
}
