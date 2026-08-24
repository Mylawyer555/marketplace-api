import {Router} from 'express';
import { changePasswordController, login, logOut, refreshToken, register } from './auth.controller';
import { validate } from '../../middlewares/validation.middleware';
import { changePasswordSchema, loginSchema, logOutSchema, refreshTokenShema, registerSchema } from './auth.validation';
import { authenticate } from '../../middlewares/auth.middleware';

const authRoutes = Router();

authRoutes.post("/register", validate(registerSchema), register);
authRoutes.post("/login", validate(loginSchema), login);
authRoutes.post("/refresh", validate(refreshTokenShema), refreshToken);
authRoutes.post("/logout", validate(logOutSchema), authenticate, logOut)
authRoutes.post("/change-password", validate(changePasswordSchema), authenticate, changePasswordController)


export default authRoutes;