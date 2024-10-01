import express from "express";
import { createEvent, getEvents } from "../controllers/event.controller";
import { isAuthenticated } from "../middleware/auth";

const eventRouter = express.Router();

eventRouter.get("/events", getEvents);

eventRouter.post("/events", isAuthenticated, createEvent);

export default eventRouter;
