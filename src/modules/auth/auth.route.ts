import {Router} from 'express';
import { login, logOut, refreshToken, register } from './auth.controller';
import { validate } from '../../middlewares/validation.middleware';
import { loginSchema, logOutSchema, refreshTokenShema, registerSchema } from './auth.validation';
import { authenticate } from '../../middlewares/auth.middleware';

const authRoutes = Router();

authRoutes.post("/register", validate(registerSchema), register);
authRoutes.post("/login", validate(loginSchema), login);
authRoutes.post("/refresh", validate(refreshTokenShema), refreshToken);
authRoutes.post("/logout", validate(logOutSchema), authenticate, logOut)


export default authRoutes;