import { app } from "./app";
import { v2 as cloudinary } from "cloudinary";
require("dotenv").config();
import http from "http";
import connectDB from "./utils/db";
import { initSocketServer } from "./socketServer";

const PORT = process.env.PORT;
const server = http.createServer(app);

//cloudinary comfig

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});
initSocketServer(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
