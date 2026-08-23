import {z} from "zod";

export const registerSchema = z.object({
    firstName: z.string().min(2,"firstname must be atleast 2 charcaters"),
    lastName: z.string().min(2, "lastname must be atleast 2 characters"),
    email: z.email("Invalid email address"),
    phoneNumber: z.string().optional(),
    password: z.string().min(8, "password must be atleast 8 characters")
});

export const loginSchema = z.object({
    email: z.email("Invalid email!"),
    password: z.string().min(8, "password must be atleast 8 characters")
});

export const refreshTokenShema = z.object({
    refreshToken: z.string()
});

