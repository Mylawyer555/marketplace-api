import express from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { deactivateUserController, getUserProfileController, updateProfileController } from "./users.controller";
import { validate } from "../../middlewares/validation.middleware";
import { updateProfileSchema } from "./users.validation";


const userRoutes = express.Router();
//user mangement
userRoutes.get("/me", authenticate, getUserProfileController);
userRoutes.patch("/me", validate(updateProfileSchema), authenticate, updateProfileController);
userRoutes.delete("/me", authenticate, deactivateUserController);



export default userRoutes;