import express, { NextFunction, Request, Response } from "express";
export const app = express();

import cors from "cors";
require("dotenv").config();
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user.route";
import { isAuthenticated } from "./middleware/auth";
import courseRouter from "./routes/course.route";
import orderRouter from "./routes/order.route";
import notificationRouter from "./routes/notifucation.route";
import analyticRouter from "./routes/analytics.route";
import layoutRouter from "./routes/layout.rout";
import path from "path";
import eventRouter from "./routes/event.route";
import cookieParser from "cookie-parser";
import questionRouter from "./routes/question.route";
import resumeRouter from "./routes/resume.routes";

//body parser

app.use(express.json({ limit: "50mb" }));

//cookie parser

app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

//routes

app.use(
  "/api/v1",
  userRouter,
  courseRouter,
  orderRouter,
  notificationRouter,
  analyticRouter,
  layoutRouter
);
app.use("/api/v1", eventRouter);
app.use("/api", resumeRouter);

// testing api
// index.js (continued)

app.use("/api/v1", questionRouter);

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is working,",
  });
});

app.get("/video/:videoName", (req, res) => {
  const videoName = req.params.videoName;
  // Assuming videos are stored in the public/assets directory
  const videoPath = path.join(
    __dirname,
    "public",
    "assets",
    `${videoName}.mp4`
  );
  // Send the video file
  res.sendFile(videoPath);
});
//unknow route

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

app.use(ErrorMiddleware);
