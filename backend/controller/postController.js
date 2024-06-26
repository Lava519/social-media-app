const { authenticate } = require('../middleware/middleware.js');
const { postModel } = require('../models/Post.js');
const fs = require("fs");

async function upload(req, res) {
    const user = await authenticate(req);
    const postData = req.body;
    console.log(postData);
    console.log(user);
    const postNumber = await postModel.find({ userID: user.userID });
    const fileName = `${postNumber.length}_${user.userID}`;
    const path = __dirname + '/../postImages/' + fileName +".jpg";
    console.log(path);
    const bufferData = Buffer.from(postData.image.split(',')[1], 'base64');
    fs.writeFile(path, bufferData, async ()=> {
        const post = await postModel.create({
            userID: user.userID,
            image: fileName,
            likes: 0,
            comments: 0,
            description: postData.description,
        });
        res.json(post);
    });
}

module.exports = {
    upload
}
