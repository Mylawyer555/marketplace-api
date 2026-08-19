import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";

export const validate = (schema: z.ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Validation Failed",
        error: result.error.issues,
      });
    }

    req.body = result.data;

    next();
  };
};
