import {Router} from 'express';
import { register } from './auth.controller';
import { validate } from '../../middlewares/validation.middleware';
import { registerSchema } from './auth.validation';

const authRoutes = Router();

authRoutes.post("/register", validate(registerSchema), register)


export default authRoutes;