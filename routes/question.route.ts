// routes/question.route.ts
import express from "express";
import {
  createQuestion,
  getAllQuestions,
} from "../controllers/question.controller";

const questionRouter = express.Router();

questionRouter.post("/create-quiz", createQuestion);
questionRouter.get("/questions", getAllQuestions);

// Other routes: Update, Delete, Get by ID

export default questionRouter;
