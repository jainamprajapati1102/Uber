// import app from "./app.js";
// import http from "http"; // Correct

// const PORT = process.env.PORT || 5000;
// const server = http.createServer(app);

// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// server.js
import app from "./app.js";
import http from "http";
import { initializeSocket } from "./socket.js";

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

initializeSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});