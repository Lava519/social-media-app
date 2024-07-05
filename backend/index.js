const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const ws = require("ws");
require('dotenv').config();

const app = express();
app.use(express.json( { limit: "10mb" } ));
app.use(cookieParser());
app.use(express.static('postImages'));

const userRoutes = require('./routes/userRoutes.js');
const chatRoutes = require('./routes/chatRoutes.js');
const postRoutes = require('./routes/postRoutes.js');
const server = app.listen(3001);
const wss = new ws.WebSocketServer( {server} );
const {messageModel} = require('./models/Message.js')

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

mongoose.connect(process.env.DB_URL, {
    authSource: process.env.DB_AUTH,
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
  })
  .then(() => {
    app.use("/user", userRoutes);
    app.use("/chat", chatRoutes);
    app.use("/post", postRoutes);
    wss.on('connection', (connection, req) =>{
      const cookies = req.headers.cookie?.split('=')[1];
      if (cookies) {
        jwt.verify(cookies, process.env.JWT_SECRET, (err, userData) => {
          if (err) throw err;
          connection.userID = userData.userID;
          connection.name = userData.name;
        })
      }
      connection.on('message', async (message) => {
        const messageData = JSON.parse(message.toString());
        if (messageData) {
          const client = [...wss.clients].filter( client => client.userID == messageData.to);
          let savedMessage = await messageModel.create(messageData);
          client[0].send(JSON.stringify({
            to: savedMessage.to,
            origin: savedMessage.origin,
            message: savedMessage.message,
            _id: savedMessage._id
          }));
        }
      });
      [...wss.clients].forEach(client => {
        client.send(JSON.stringify({
            online: [...wss.clients].map(o => ({userID: o.userID, name: o.name}))
        }));
      });
    })
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000);