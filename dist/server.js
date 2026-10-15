"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
const PORT = process.env.PORT || 5000;
async function startServer() {
    try {
        //test db connections
        await db_1.db.$connect();
        console.log("Connected to PostgreSQL database via Prisma");
        //start accepting incoming request
        app_1.default.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to connect to database:", error);
        //disconnect safely before terminating process
        await db_1.db.$disconnect();
        process.exit(1);
    }
    ;
}
;
startServer();
//# sourceMappingURL=server.js.map