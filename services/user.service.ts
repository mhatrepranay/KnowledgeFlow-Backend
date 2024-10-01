//get user by id

import { Response } from "express";
import userModel from "../models/user.model";
import { redis } from "../utils/redis";

export const getUSerById = async (id: string, res: Response) => {
  const userJson = await redis.get(id);

  if (userJson) {
    const user = JSON.parse(userJson);
    res.status(201).json({
      success: true,
      user,
    });
  }
};

//Get all user

export const getAllUsersService = async (res: Response) => {
  const users = await userModel.find().sort({ createAt: -1 });

  res.status(201).json({
    success: true,
    users,
  });
};

//update user service

export const updateUserRoleService = async (
  res: Response,
  id: string,
  role: string
) => {
  const user = await userModel.findByIdAndUpdate(id, { role }, { new: true });

  res.status(201).json({
    success: true,
    user,
  });
};
