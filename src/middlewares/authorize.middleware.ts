import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { StatusCodes } from "http-status-codes";

export const authorize = (...allowedRole: string[]) => {
    return (req: Request, res:Response, next:NextFunction)=>{
        const user = req.user;
        if(!user){
            throw new AppError("Authentication required", StatusCodes.UNAUTHORIZED);
        };

        if(!allowedRole.includes(user.role)){
            throw new AppError("Access denied", StatusCodes.FORBIDDEN);
        };

        next();
    };
};
