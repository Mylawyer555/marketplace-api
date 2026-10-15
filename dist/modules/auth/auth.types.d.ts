import { z } from "zod";
import { changePasswordSchema, forgotPasswordSchema, loginSchema, logOutSchema, refreshTokenShema, registerSchema, resetPasswordSchema } from "./auth.validation";
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type AuthUser = {
    userId: number;
    role: string;
};
export type RefreshToken = z.infer<typeof refreshTokenShema>;
export type LogOut = z.infer<typeof logOutSchema>;
export type ChangePassword = z.infer<typeof changePasswordSchema>;
export type forgotPassword = z.infer<typeof forgotPasswordSchema>;
export type resetToken = z.infer<typeof resetPasswordSchema>;
//# sourceMappingURL=auth.types.d.ts.map