import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const port = 3000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["*"],
  },
});

io.on("connection", (socket) => {
  console.log("Usuário conectado", socket.id);

  socket.on("set_username", (username) => {
    socket.data.username = username;
    console.log("socket.data.username ", socket.data.username);
  });

  socket.on("send_message", (message) => {
    io.emit("received_message", {
      message,
      id: socket.id,
      username: socket.data.username,
    });
  });
});

server.listen(port, () => console.log("Server running!"));
