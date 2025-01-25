// socket.js
import { Server } from "socket.io";
import http from "http";
import userModel from "./models/user.model.js";
import { captainModel } from "./models/captain.model.js";
import { log } from "console";

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("join", async (data) => {
      const { userid, userType } = data;
      console.log(`User ${userid} joined as a ${userType}-> ${socket.id}`);
      try {
        if (userType === "user") {
          const user = await userModel.findByIdAndUpdate(userid, {
            socketId: socket.id,
          });
          if (!user) {
            console.error("User not found, socketId not updated");
          }
        } else if (userType === "captain") {
          const captain = await captainModel.findByIdAndUpdate(userid, {
            socketId: socket.id,
          });
          if (!captain) {
            console.error("Captain not found, socketId not updated");
          }
        }
      } catch (error) {
        console.error("Error updating socketId:", error);
      }
    });

    socket.on("update-location-captains", async (data) => {
      const { userid, location } = data;
      if (!location || !location.ltd || !location.lng) {
        return socket.emit("error", { message: "invalid location data" });
      }
      await captainModel.findByIdAndUpdate(userid, {
        location: {
          ltd: location.ltd,
          lng: location.lng,
        },
      });
    });

    socket.on("disconnect", () => {
      console.log("a client disconnected");
    });
  });
};

const sendMessageToSocketId = (socketId, messageObj) => {
  console.log(
    `sending Message to socketId: ${socketId} with data: ${JSON.stringify(
      messageObj
    )}`
  );
  if (io) {
    io.to(socketId).emit(messageObj.event, messageObj.data);
  } else {
    console.error("Socket.io is not initialized");
  }
};

export { initializeSocket, sendMessageToSocketId };
