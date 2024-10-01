import { Server as SocketIoServer } from "socket.io";
import http from "http";

export const initSocketServer = (server: http.Server) => {
  const io = new SocketIoServer(server);

  io.on("connection", (socket) => {
    console.log("A new user conneted");

    //notification from frontend

    socket.on("notification", (data) => {
      //brodcast the notification data to all admin

      io.emit("newNotification", data);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};
