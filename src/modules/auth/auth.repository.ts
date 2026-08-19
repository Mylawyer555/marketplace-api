import { db } from "../../config/db";
import { RegisterInput } from "./auth.types";


export const findUserByEmail = async (email: string) => {
    return db.users.findUnique({
        where: {
            email,
        },
    });
}

export const createUser = async (data: RegisterInput) => {
    return db.users.create({
        data: {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            hash_password: data.password,
            ...(data.phoneNumber && {
                phone_number: data.phoneNumber
            })
        },
    });
};