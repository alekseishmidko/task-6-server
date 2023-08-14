import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io"; // Импортируем Server из socket.io
import * as socketIO from "socket.io";
import { message, getMessages } from "./controllers/MessagesController.js";
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors({ origin: "*" }));

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

// Создаем http сервер
const server = http.createServer(app);
// Создаем экземпляр Socket.IO и передаем сервер
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
// Обработка событий Socket.IO
io.on("connection", (socket) => {
  console.log(`A user connected ${socket.id}`);
  //
  socket.on("message", (data) => {
    console.log("socket message:", data);
    io.emit("responce", data);
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(process.env.PORT || 3001, (error) => {
  if (error) console.log(error, "err");
  else {
    console.log(` server  is running`);
  }
});
