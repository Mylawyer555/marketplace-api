"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactivateAccount = exports.invalidateResetToken = exports.findResetTokenByHash = exports.createResetToken = exports.revokeAllUserRefreshToken = exports.updateUserPassword = exports.findUserById = exports.revokeRefreshToken = exports.findRefreshTokenByHash = exports.createRefreshToken = exports.createUser = exports.findUserByEmail = void 0;
const db_1 = require("../../config/db");
const findUserByEmail = async (email) => {
    return db_1.db.user.findUnique({
        where: {
            email,
        },
    });
};
exports.findUserByEmail = findUserByEmail;
const createUser = async (data) => {
    return db_1.db.user.create({
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
exports.createUser = createUser;
const createRefreshToken = async (userId, tokenHash, expiresAt) => {
    return db_1.db.refreshToken.create({
        data: {
            user_id: userId,
            token_hash: tokenHash,
            expires_at: expiresAt
        },
    });
};
exports.createRefreshToken = createRefreshToken;
const findRefreshTokenByHash = async (token) => {
    return db_1.db.refreshToken.findUnique({
        where: {
            token_hash: token
        },
        include: {
            users: true,
        }
    });
};
exports.findRefreshTokenByHash = findRefreshTokenByHash;
const revokeRefreshToken = async (refreshId) => {
    const newDate = new Date();
    return db_1.db.refreshToken.update({
        where: {
            refresh_token_id: refreshId,
        },
        data: {
            revoked_at: newDate,
        },
    });
};
exports.revokeRefreshToken = revokeRefreshToken;
const findUserById = async (userId) => {
    return db_1.db.user.findUnique({
        where: {
            user_id: userId
        },
    });
};
exports.findUserById = findUserById;
const updateUserPassword = async (userId, hashedPassword) => {
    return db_1.db.user.update({
        where: {
            user_id: userId
        },
        data: {
            hash_password: hashedPassword
        },
    });
};
exports.updateUserPassword = updateUserPassword;
const revokeAllUserRefreshToken = async (userId) => {
    return db_1.db.refreshToken.updateMany({
        where: {
            user_id: userId,
            revoked_at: null
        },
        data: {
            revoked_at: new Date()
        },
    });
};
exports.revokeAllUserRefreshToken = revokeAllUserRefreshToken;
const createResetToken = async (userId, tokenHash, expiresAt) => {
    return db_1.db.resetToken.create({
        data: {
            user_id: userId,
            token_hash: tokenHash,
            expires_at: expiresAt
        },
    });
};
exports.createResetToken = createResetToken;
const findResetTokenByHash = async (tokenHash) => {
    return db_1.db.resetToken.findUnique({
        where: {
            token_hash: tokenHash,
        },
        include: {
            users: true
        }
    });
};
exports.findResetTokenByHash = findResetTokenByHash;
const invalidateResetToken = async (resetTokenId) => {
    return db_1.db.resetToken.update({
        where: {
            reset_token_id: resetTokenId
        },
        data: {
            used_at: new Date()
        },
    });
};
exports.invalidateResetToken = invalidateResetToken;
const reactivateAccount = async (userId) => {
    return db_1.db.user.update({
        where: {
            user_id: userId,
        },
        data: {
            account_status: "ACTIVE",
            deactivated_at: null,
            deletion_at: null
        },
        select: {
            user_id: true,
            role: true,
            account_status: true
        },
    });
};
exports.reactivateAccount = reactivateAccount;
//# sourceMappingURL=auth.repository.js.map