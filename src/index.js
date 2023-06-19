const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../public")));

//

let count = 0;

// server(emit) -> client(receive) - countUpdated
// client(emit) -> server(receive) - increment

io.on("connection", (socket) => {
  console.log("A new connection to the server {Welcom from socketIO}");

  // Sending an event to the server with the name (countUpdated) using emit
  // The event need to be lisitened from the client
  socket.emit("countUpdated", count); // The second argument is passed to the client

  // Lisitening for an event from client
  socket.on("increment", () => {
    count++;

    // Emit an event to a specific connection/socket (client)
    // socket.emit("countUpdated", count);

    // Emit an event to every single connection
    io.emit("countUpdated", count);
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
