import { db } from "../../config/db";
import { RegisterInput } from "./auth.types";


export const findUserByEmail = async (email: string) => {
    return db.user.findUnique({
        where: {
            email,
        },
    });
}

export const createUser = async (data: RegisterInput) => {
    return db.user.create({
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

export const createRefreshToken = async (
    userId: number,
    tokenHash: string,
    expiresAt: Date
) =>{
    return db.refreshToken.create({
        data: {
            user_id: userId,
            token_hash: tokenHash,
            expires_at: expiresAt
        },
    });
};

export const findRefreshTokenByHash = async (token: string) => {
    return db.refreshToken.findUnique({
        where: {
            token_hash: token
        },
        include: {
            users: true,
        }
    })
};

export const revokeRefreshToken = async(refreshId: number)=> {
    const newDate = new Date()
    return db.refreshToken.update({
        where: {
            refresh_token_id: refreshId,
        },
        data: {
            revoked_at: newDate,
        },
    });
};

export const findUserById = async (userId: number)=> {
    return db.user.findUnique({
        where: {
            user_id: userId
        },
    });
};

export const updateUserPassword = async(userId: number, hashedPassword: string) =>{
    return db.user.update({
        where: {
            user_id: userId
        },
        data: {
            hash_password: hashedPassword
        },
    });
};

export const revokeAllUserRefreshToken = async (userId: number) => {
    return db.refreshToken.updateMany({
        where: {
            user_id: userId, 
            revoked_at: null
        },
        data: {
            revoked_at : new Date()
        },
    });
};