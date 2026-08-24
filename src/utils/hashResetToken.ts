import crypto from 'crypto';

export const hashResetToken = (resetToken:string) => {
    const hash = crypto.createHash("sha256");
    // give hash a token
    hash.update(resetToken);
    //convert hash to string
    return hash.digest("hex")
}