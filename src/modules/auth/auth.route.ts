import {Router} from 'express';
import { login, refreshToken, register } from './auth.controller';
import { validate } from '../../middlewares/validation.middleware';
import { loginSchema, refreshTokenShema, registerSchema } from './auth.validation';
import { authenticate } from '../../middlewares/auth.middleware';

const authRoutes = Router();

authRoutes.post("/register", validate(registerSchema), register);
authRoutes.post("/login", validate(loginSchema), login);
authRoutes.post("/refresh", validate(refreshTokenShema), refreshToken);


export default authRoutes;