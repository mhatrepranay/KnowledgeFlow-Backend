import express from "express";
import {
  addAnswer,
  addQuestion,
  addReplyToReview,
  addReview,
  deleteCourse,
  editCourse,
  generateVideourl,
  getAllAdminCourse,
  getAllCourses,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const courseRouter = express.Router();

courseRouter.post(
  "/create-course",

  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse
);
courseRouter.put(
  "/edit-course/:id",

  isAuthenticated,
  authorizeRoles("admin"),
  editCourse
);
courseRouter.get("/get-course/:id", getSingleCourse);
courseRouter.get("/get-courses", getAllCourses);
courseRouter.get("/get-course-content/:id", isAuthenticated, getCourseByUser);

courseRouter.put(
  "/add-question",

  isAuthenticated,
  addQuestion
);
courseRouter.put("/add-answer", isAuthenticated, addAnswer);
courseRouter.put(
  "/add-review/:id",

  isAuthenticated,
  addReview
);
courseRouter.put(
  "/add-reply",

  isAuthenticated,
  authorizeRoles("admin"),
  addReplyToReview
);

courseRouter.get(
  "/get-admin-courses",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllAdminCourse
);

courseRouter.delete(
  "/delete-courses/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteCourse
);
courseRouter.post("/getVdoCipherOtp", generateVideourl);

export default courseRouter;
