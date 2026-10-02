import crypto from 'crypto';

export const generatePaymentReference = () => {
    const randomChar = crypto.randomBytes(5).toString("hex");
    return `Pay-${Date.now()}-${randomChar}`
}