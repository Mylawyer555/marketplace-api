import { Request, Response, NextFunction } from "express";
import { loginUser, refreshAccessToken, registerUser } from "./auth.service";
import { StatusCodes } from "http-status-codes";

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

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
 try {
    const result = await loginUser(req.body);

    res.status(StatusCodes.OK).json({
        success: true,
        message: "Login successful",
        data: result
    })
 } catch (error) {
    next(error)
 }
};

export const refreshToken = async (
  req:Request,
  res:Response,
  next:NextFunction
) =>{
  try {
    const {refreshToken} = req.body;
    const result = await refreshAccessToken(refreshToken);
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Access token refreshed",
      data: result
    });

  } catch (error) {
    next(error)
  };
};
