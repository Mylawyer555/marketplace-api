import { Request, Response, NextFunction } from "express";
import { registerUser } from "./auth.service";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
    const user = await registerUser(req.body);
    return res.status(201).json({
        message: "User successfully registered",
        user,
    });
};
