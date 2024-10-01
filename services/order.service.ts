import { NextFunction, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import OrderModel from "../models/oredrModel";

export const newOrder = CatchAsyncError(
  async (data: any, res: Response, next: NextFunction) => {
    // Change the order of parameters
    try {
      const order = await OrderModel.create(data);

      res.status(200).json({
        success: true,
        order,
      });
    } catch (error) {
      next(error); // Forward any error to the error handling middleware
    }
  }
);

//get all orders

export const getAllOrdersService = async (res: Response) => {
  const orders = await OrderModel.find().sort({ createAt: -1 });

  res.status(201).json({
    success: true,
    orders,
  });
};
