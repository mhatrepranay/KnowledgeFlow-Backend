import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  getCourseAnalytics,
  getOrderAnalytics,
  getUserAnalytics,
} from "../controllers/analytics.controller";

const analyticRouter = express.Router();

analyticRouter.get(
  "/get-user-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  getUserAnalytics
);
analyticRouter.get(
  "/get-orders-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  getOrderAnalytics
);
analyticRouter.get(
  "/get-courses-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  getCourseAnalytics
);

export default analyticRouter;
