import { Schema, model, Document } from "mongoose";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
   courseId: string;
}

interface QuestionDocument extends Question, Document {}

const questionSchema = new Schema<QuestionDocument>({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: Number,
    required: true,
  },
  courseId: {
    // Define courseId field in schema
    type: String,
    required: true,
  },
});

const QuestionModel = model<QuestionDocument>("Question", questionSchema);

export { QuestionModel, QuestionDocument };
