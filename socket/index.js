const express = require("express");
const cors = require("cors");

const socketio = require("socket.io");
const http = require("http");

const app = express();

const server = http.createServer(app);
const io = socketio(server);
const PORT = 5000;

app.enable("trust proxy", true);
app.use(cors());
// Health check endpoint
app.get("/adelino", (req, res) => res.send("Healthy"));

server.listen(PORT, () => {
  console.log(`Server running in por ${PORT}`);
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when connect
  console.log("a user connected.");

  socket.on("message", (payload) => {
    console.log(payload);
    switch (payload.type) {
      case "ADD_USER": {
        addUser(payload.userId, socket.id);
        io.emit("message", { type: "GET_USERS", payload: users });
        return;
      }
      case "SEND_FOLLOWER": {
        console.log(payload);
        const { sender, receiver } = payload;
        const user = getUser(receiver.id);
        io.to(user.socketId).emit("message", {
          type: "GET_FOLLOWER",
          payload: sender,
        });
        return;
      }
      case "SEND_CONVERSATION": {
        console.log(payload);
        const { receiver, conversation } = payload;
        const user = getUser(receiver);
        io.to(user.socketId).emit("message", {
          type: "GET_CONVERSATION",
          payload: conversation,
        });

        return;
      }

      case "SEND_MESSAGE": {
        console.log(payload);
        const { receiver, message } = payload;
        const user = getUser(receiver);
        io.to(user.socketId).emit("message", {
          type: "GET_MESSAGE",
          payload: message,
        });

        return;
      }
    }
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("message", { type: "GET_USERS", payload: users });
  });
});
