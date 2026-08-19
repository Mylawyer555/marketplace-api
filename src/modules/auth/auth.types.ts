import {z} from "zod";
import { registerSchema } from "./auth.validation";

// infer types in other to sync validation with types

export type RegisterInput = z.infer<typeof registerSchema>;