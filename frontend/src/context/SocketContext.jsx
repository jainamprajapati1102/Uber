import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    // Initialize socket connection on mount
    const socketIo = io(import.meta.env.VITE_BASE_URL); // Ensure the URL is correctly set in your .env file
    setSocket(socketIo);
    socketIo.on("connect", () => console.log("Connected to server"));
    socketIo.on("disconnect", () => console.log("Disconnected from server"));
    // Cleanup socket on unmount
    return () => {
      socketIo.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

// import React, { createContext, useEffect } from "react";
// import { io } from "socket.io-client";

// export const SocketContext = createContext();

// const socket = io(`${import.meta.env.VITE_BASE_URL}`); // Replace with your server URL

// const SocketContext = ({ children }) => {
//   useEffect(() => {
//     // Basic connection logic
//     socket.on("connect", () => {
//       console.log("Connected to server");
//     });

//     socket.on("disconnect", () => {
//       console.log("Disconnected from server");
//     });
//   }, []);

//   return (
//     <SocketContext.Provider value={{ socket }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export default SocketContext;
