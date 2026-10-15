"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshExpiry = void 0;
const generateRefreshExpiry = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date;
};
exports.generateRefreshExpiry = generateRefreshExpiry;
//# sourceMappingURL=refreshExpiry.js.map