import jwt from "jsonwebtoken"
import { AppError } from "./AppError";
import { StatusCodes } from "http-status-codes";

export const generateAccessToken = (userId:number, role: string) => {

    const JWT_SECRET = process.env.JWT_SECRET;

    if(!JWT_SECRET){
        throw new AppError("JWT_ACCESS_SECRET not defined", StatusCodes.INTERNAL_SERVER_ERROR)
    }
    const accessToken = jwt.sign(
        {userId, role},
        JWT_SECRET,
        {
            expiresIn: "15m"
        }
    );
    return accessToken;
}