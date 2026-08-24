import {Router} from 'express';
import { changePasswordController, forgotPasswordController, login, logOut, refreshToken, register, resetPasswordController } from './auth.controller';
import { validate } from '../../middlewares/validation.middleware';
import { changePasswordSchema, forgotPasswordSchema, loginSchema, logOutSchema, refreshTokenShema, registerSchema, resetPasswordSchema } from './auth.validation';
import { authenticate } from '../../middlewares/auth.middleware';

const authRoutes = Router();

authRoutes.post("/register", validate(registerSchema), register);
authRoutes.post("/login", validate(loginSchema), login);
authRoutes.post("/refresh", validate(refreshTokenShema), refreshToken);
authRoutes.post("/logout", validate(logOutSchema), authenticate, logOut)
authRoutes.post("/change-password", validate(changePasswordSchema), authenticate, changePasswordController);
authRoutes.post("/forgot-password", validate(forgotPasswordSchema), forgotPasswordController);
authRoutes.post("/reset-password", validate(resetPasswordSchema), resetPasswordController);


export default authRoutes;