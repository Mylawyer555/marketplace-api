import crypto from 'crypto'
export const generateResetToken = () => {
    return crypto.randomBytes(64).toString("hex")
};