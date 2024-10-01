import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import EventModel from "../models/event.model";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";

// export const getEvents = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   try {
//     const events = await EventModel.find().populate("user", "name");
//     return res.json({
//       ok: true,
//       events,
//     });
//   } catch (error: any) {
//     console.error(error);
//     return res.status(500).json({
//       ok: false,
//       msg: "Please, contact the administrator",
//     });
//   }
// };

export const getEvents = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const events = await EventModel.find();
      return res.json({
        ok: true,
        events,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const createEvent = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, start, end, notes } = req.body;
      const event = {
        title,
        start,
        end,
        notes,
        user: req.user,
      };
      await EventModel.create(event);

      res.status(200).json({
        success: true,
        message: "Layout created successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const updateEvent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { title, start, end, notes } = req.body;

  try {
    const event = await EventModel.findByIdAndUpdate(
      id,
      {
        title,
        start,
        end,
        notes,
      },
      { new: true }
    );

    return res.json({ ok: true, event });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Please, contact the administrator",
    });
  }
};

export const deleteEvent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const event = await EventModel.findByIdAndDelete(id);
    return res.json({
      ok: true,
      event,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Please, contact the administrator",
    });
  }
};
