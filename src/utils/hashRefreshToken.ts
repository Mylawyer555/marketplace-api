import crypto from "crypto";

export const hashRefreshToken = (token: string) => {
    const hash = crypto.createHash("sha256");
    //give hash a token
    hash.update(token);
    //convert resulting hash to string
    return hash.digest("hex");
};

