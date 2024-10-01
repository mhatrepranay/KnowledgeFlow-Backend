import { Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import CourseModel from "../models/course.model";

// create course
export const createCouse = CatchAsyncError(async (data: any, res: Response) => {
  const course = await CourseModel.create(data);

  res.status(201).json({
    success: true,
    course,
  });
});

//get all courses

export const getAllCoursesService = async (res: Response) => {
  const courses = await CourseModel.find().sort({ createAt: -1 });

  res.status(201).json({
    success: true,
    courses,
  });
};
