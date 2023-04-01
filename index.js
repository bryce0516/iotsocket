const app = require("express")();
const http = require("http").createServer(app);
let io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

http.listen(4000, () => {
  console.log("listening on *:4000");
});
