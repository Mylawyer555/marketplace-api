import { RegisterInput } from "./auth.types";
import type { LoginInput } from "./auth.types";
export declare const registerUser: (data: RegisterInput) => Promise<{
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string | null;
    hash_password: string;
    account_status: import("../../generated/prisma/enums").account_status;
    role: import("../../generated/prisma/enums").user_role;
    deactivated_at: Date | null;
    deletion_at: Date | null;
    created_at: Date | null;
    updated_at: Date | null;
}>;
export declare const loginUser: (data: LoginInput) => Promise<{
    accessToken: string;
    refreshToken: string;
}>;
export declare const refreshAccessToken: (refreshToken: string) => Promise<{
    accessToken: string;
    refreshToken: string;
}>;
export declare const logOutUser: (userId: number, refreshToken: string) => Promise<{
    success: boolean;
}>;
export declare const changePassword: (userId: number, currentPassword: string, newPassword: string) => Promise<{
    success: boolean;
}>;
export declare const forgotPassword: (email: string) => Promise<{
    success: boolean;
    message: string;
    resetToken?: never;
} | {
    success: boolean;
    resetToken: string;
    message: string;
}>;
export declare const resetPassword: (resetToken: string, newPassword: string) => Promise<{
    success: boolean;
    message: string;
}>;
//# sourceMappingURL=auth.service.d.ts.map