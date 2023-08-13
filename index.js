import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import * as socketIO from "socket.io";
import { message, getMessages } from "./controllers/MessagesController.js";
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;
const port_server = process.env.PORT_SERVER || 3002;
// DB
mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log("DB is active!");
  })
  .catch((error) => {
    console.log(error, "DB error");
  });

// controllers
app.post("/auth/message", message);
app.get("/auth/getMessages", getMessages);

// server(socket )
const server = http.createServer(app);
const io = new socketIO.Server(server);
server.listen(port_server, () => {
  console.log(`Server is running on port ${port_server}}`);
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.on("message", (msg) => {
    socket.msg = msg;
  });
  io.emit("getMessages", socket.msg);
});
//
app.listen(port, (error) => {
  if (error) console.log(error, "err");
  else {
    console.log(`${port} is running`);
  }
});
