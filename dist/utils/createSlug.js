"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSlug = void 0;
const generateSlug = (text) => {
    return text
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^0-9a-z-]/g, "")
        .replace(/-+/g, "-");
};
exports.generateSlug = generateSlug;
//# sourceMappingURL=createSlug.js.map