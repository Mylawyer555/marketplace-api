import {z} from "zod";
import { loginSchema, registerSchema } from "./auth.validation";


//Register
export type RegisterInput = z.infer<typeof registerSchema>;

//login
export type LoginInput = z.infer<typeof loginSchema>;

export type AuthUser = {
    userId: number,
    role: string
}