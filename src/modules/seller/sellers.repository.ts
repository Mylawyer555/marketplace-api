import { db } from "../../config/db";

export const makeUserSeller = async (userId: number)=> {
    return db.user.update({
        where: {
            user_id: userId,
        },
        data: {
            role: "SELLER",
        },
        select: {
            user_id: true,
            first_name: true,
            last_name: true,
            email: true,
            role:true
        },
    });
};