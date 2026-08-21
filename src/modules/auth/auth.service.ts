import bcrypt from "bcrypt";
import { findUserByEmail, createUser } from "./auth.repository";
import  { RegisterInput} from "./auth.types";
import type { LoginInput } from "./auth.types";
import { AppError } from "../../utils/AppError";
import { StatusCodes } from "http-status-codes";
import { generateAccessToken } from "../../utils/jwt";

export const registerUser = async (data: RegisterInput) => {
    const isUserExist = await findUserByEmail(data.email);

    if(isUserExist) {
        throw new AppError("Email already exist", StatusCodes.CONFLICT);
    };

    const hashPassword = await bcrypt.hash(data.password, 12);

    const user = await createUser({
        ...data,
        password: hashPassword
    });

    return user;

};


export const loginUser = async (data: LoginInput) => {
    const user = await findUserByEmail(data.email);

    if (!user){
        throw new AppError("Invalid email or password", StatusCodes.UNAUTHORIZED);
    };

    const isCheckPass = await bcrypt.compare(data.password, user.hash_password);

    if (!isCheckPass){
        throw new AppError("Invalid email or password", StatusCodes.UNAUTHORIZED);
    };

    const accessToken = generateAccessToken(
        user.user_id,
        user.role
    )

    return {accessToken};


}