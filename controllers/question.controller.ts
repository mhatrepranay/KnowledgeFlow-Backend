// controllers/question.controller.ts
import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import { QuestionModel } from "../models/Question";

// Create a new question
export const createQuestion = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const question = await QuestionModel.create(req.body);
      res.status(201).json(question);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
);

// Get all questions
export const getAllQuestions = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const questions = await QuestionModel.find();
      res.json(questions);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
);

// Other controllers: Update, Delete, Get by ID
