import bcrypt from "bcrypt";
import { findUserByEmail, createUser } from "./auth.repository";
import { RegisterInput } from "./auth.types";
import { AppError } from "../../utils/AppError";

export const registerUser = async (data: RegisterInput) => {
    const isUserExist = await findUserByEmail(data.email);

    if(!isUserExist) {
        throw new AppError("Email already Registered", 409);
    };

    const hashPassword = await bcrypt.hash(data.password, 12);

    const user = await createUser({
        ...data,
        password: hashPassword
    });

    return user;

}