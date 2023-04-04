const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const Redis = require("ioredis");

const redisClient = new Redis({
  host: "gasapp-001.tm82ce.0001.apn2.cache.amazonaws.com",
  port: 6379,
});

redisClient.on("error", (err) => {
  throw Error(err);
});
redisClient.sadd("cb1");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
app.post("/", async (req, res) => {
  const id = await redisClient.get("id");
  console.log(id);
  res.send("Hello post!");
});
app.get("/", (req, res) => {
  res.send("Hello get!");
});

io.on("connection", (socket) => {
  socket.interval;
  io.to("1")
    .timeout(1000)
    .emit("dd", "dd", (ack, response) => {
      console.log("ack", ack);
      console.log("response", response);
    });
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    console.log("send_message", data);
    socket.to(data.room).emit("receive_message", data);
  });
});

server.listen(4000, () => {
  console.log("SERVER IS RUNNING", 4000);
});
