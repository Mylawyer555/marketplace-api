import { RegisterInput } from "./auth.types";
export declare const findUserByEmail: (email: string) => Promise<{
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
} | null>;
export declare const createUser: (data: RegisterInput) => Promise<{
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
export declare const createRefreshToken: (userId: number, tokenHash: string, expiresAt: Date) => Promise<{
    refresh_token_id: number;
    user_id: number;
    token_hash: string;
    expires_at: Date;
    revoked_at: Date | null;
    created_at: Date;
}>;
export declare const findRefreshTokenByHash: (token: string) => Promise<({
    users: {
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
    };
} & {
    refresh_token_id: number;
    user_id: number;
    token_hash: string;
    expires_at: Date;
    revoked_at: Date | null;
    created_at: Date;
}) | null>;
export declare const revokeRefreshToken: (refreshId: number) => Promise<{
    refresh_token_id: number;
    user_id: number;
    token_hash: string;
    expires_at: Date;
    revoked_at: Date | null;
    created_at: Date;
}>;
export declare const findUserById: (userId: number) => Promise<{
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
} | null>;
export declare const updateUserPassword: (userId: number, hashedPassword: string) => Promise<{
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
export declare const revokeAllUserRefreshToken: (userId: number) => Promise<import("../../generated/prisma/internal/prismaNamespace").BatchPayload>;
export declare const createResetToken: (userId: number, tokenHash: string, expiresAt: Date) => Promise<{
    reset_token_id: number;
    user_id: number;
    token_hash: string;
    expires_at: Date;
    used_at: Date | null;
    created_at: Date;
}>;
export declare const findResetTokenByHash: (tokenHash: string) => Promise<({
    users: {
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
    };
} & {
    reset_token_id: number;
    user_id: number;
    token_hash: string;
    expires_at: Date;
    used_at: Date | null;
    created_at: Date;
}) | null>;
export declare const invalidateResetToken: (resetTokenId: number) => Promise<{
    reset_token_id: number;
    user_id: number;
    token_hash: string;
    expires_at: Date;
    used_at: Date | null;
    created_at: Date;
}>;
export declare const reactivateAccount: (userId: number) => Promise<{
    account_status: import("../../generated/prisma/enums").account_status;
    role: import("../../generated/prisma/enums").user_role;
    user_id: number;
}>;
//# sourceMappingURL=auth.repository.d.ts.map