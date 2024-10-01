import express from "express";
import {
  activateUser,
  deleteUser,
  getAllUsers,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  socialAuth,
  updatePassword,
  updateProfilePicture,
  updateUserInfo,
  updateUserRole,
} from "../controllers/user.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const userRouter = express.Router();

userRouter.post("/registration", registrationUser);
userRouter.post("/activate-user", activateUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", isAuthenticated, logoutUser);

userRouter.get("/me", isAuthenticated, getUserInfo);
userRouter.post("/socialauth", socialAuth);
userRouter.put("/update", isAuthenticated, updateUserInfo);
userRouter.put("/updatepassword", isAuthenticated, updatePassword);
userRouter.put("/updateavatar", isAuthenticated, updateProfilePicture);
userRouter.get(
  "/get-users",

  isAuthenticated,
  authorizeRoles("admin"),
  getAllUsers
);
userRouter.put(
  "/update-user-role",
  isAuthenticated,
  authorizeRoles("admin"),
  updateUserRole
);

userRouter.delete(
  "/delete-user/:id",

  isAuthenticated,
  authorizeRoles("admin"),
  deleteUser
);
export default userRouter;
