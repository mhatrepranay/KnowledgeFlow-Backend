import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import LayoutModel from "../models/layout.model";

import cloudinary from "cloudinary";

// craete layout

export const createLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;

      const isTypeExit = await LayoutModel.findOne({ type });

      if (isTypeExit) {
        return next(new ErrorHandler(`${type} already exist`, 400));
      }
      if (type === "Banner") {
        const { image, title, subTitle } = req.body;
        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });

        const banner = {
          type: "Banner",
          banner: {
            image: {
              public_id: myCloud.public_id,
              url: myCloud.secure_url,
            },
            title,
            subTitle,
          },
        };

        await LayoutModel.create(banner);
      }

      if (type === "FAQ") {
        const { faq } = req.body;
        const faqItems = await Promise.all(
          faq.map(async (item: any) => {
            return {
              question: item.question,
              answer: item.answer,
            };
          })
        );

        await LayoutModel.create({ type: "FAQ", faq: faqItems });
      }

      if (type === "Categories") {
        const { categories } = req.body;
        const categoriesItems = await Promise.all(
          categories.map(async (item: any) => {
            return {
              title: item.title,
            };
          })
        );
        await LayoutModel.create({
          type: "Categories",
          categories: categoriesItems,
        });
      }

      res.status(200).json({
        success: true,
        message: "Layout created successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//edit layout

export const editLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
      if (type === "Banner") {
        const { image, title, subTitle } = req.body;
        let bannerData: any;

        // Check if the image URL starts with "https" to determine if it's already hosted on Cloudinary
        if (image.startsWith("https")) {
          // If it's already hosted on Cloudinary, no need to re-upload, just update the document
          bannerData = await LayoutModel.findOneAndUpdate(
            { type: "Banner" },
            {
              $set: {
                "banner.image.url": image, // Update the image URL directly
                title,
                subTitle,
              },
            },
            { new: true } // Return the updated document
          );
        } else {
          // If it's not hosted on Cloudinary, upload the image to Cloudinary first
          const data = await cloudinary.v2.uploader.upload(image, {
            folder: "layout",
          });
          bannerData = await LayoutModel.findOneAndUpdate(
            { type: "Banner" },
            {
              $set: {
                "banner.image.public_id": data.public_id,
                "banner.image.url": data.secure_url,
                title,
                subTitle,
              },
            },
            { new: true } // Return the updated document
          );
        }

        // Return success response with the updated document
        res.status(200).json({
          success: true,
          message: "Layout updated successfully",
          data: bannerData, // Optionally, you can include the updated document in the response
        });
      }

      if (type === "FAQ") {
        const { faq } = req.body;

        const FaqItem = await LayoutModel.findOne({ type: "FAQ" });

        const faqItems = await Promise.all(
          faq.map(async (item: any) => {
            return {
              question: item.question,
              answer: item.answer,
            };
          })
        );

        await LayoutModel.findByIdAndUpdate(FaqItem?._id, {
          type: "FAQ",
          faq: faqItems,
        });
      }

      if (type === "Categories") {
        const { categories } = req.body;
        const categoriesData = await LayoutModel.findOne({
          type: "Categories",
        });

        const categoriesItems = await Promise.all(
          categories.map(async (item: any) => {
            return {
              title: item.title,
            };
          })
        );
        await LayoutModel.findByIdAndUpdate(categoriesData?._id, {
          type: "Categories",
          categories: categoriesItems,
        });
      }

      res.status(200).json({
        success: true,
        message: "Layout updated  successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//get layout by type

export const getLayoutByType = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.params;

      const layout = await LayoutModel.findOne({ type });

      res.status(200).json({
        success: true,
        layout,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
