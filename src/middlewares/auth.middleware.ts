import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "../utils/AppError";
import { StatusCodes } from "http-status-codes";


export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const result = req.headers.authorization;
    
    if(!result){
        throw new AppError("authorization header missing", StatusCodes.UNAUTHORIZED)
    }

    const parts = result.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
        throw new AppError(
            "Invalid authoriation header",
            StatusCodes.UNAUTHORIZED
        );
    };

    const token = parts[1];
    if(typeof token !== "string"){
        throw new AppError(
            "Invalid token",
            StatusCodes.UNAUTHORIZED
        );
    };

    const JWT_SECRET = process.env.JWT_SECRET;

    if(!JWT_SECRET){
        throw new AppError(
            "JWT secret not defined",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    };

    const decode = jwt.verify(token, JWT_SECRET) as JwtPayload

    console.log(decode)

    req.user = {
        userId: decode.userId,
        role: decode.role

    }


    next()


}