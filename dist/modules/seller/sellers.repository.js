"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUserSeller = void 0;
const db_1 = require("../../config/db");
const makeUserSeller = async (userId) => {
    return db_1.db.user.update({
        where: {
            user_id: userId,
        },
        data: {
            role: "SELLER",
        },
        select: {
            user_id: true,
            first_name: true,
            last_name: true,
            email: true,
            role: true
        },
    });
};
exports.makeUserSeller = makeUserSeller;
//# sourceMappingURL=sellers.repository.js.map