import {Router} from 'express';
import { login, register } from './auth.controller';
import { validate } from '../../middlewares/validation.middleware';
import { loginSchema, registerSchema } from './auth.validation';
import { authenticate } from '../../middlewares/auth.middleware';

const authRoutes = Router();

authRoutes.post("/register", validate(registerSchema), register);
authRoutes.post("/login", validate(loginSchema), login);
authRoutes.get("/test-auth", authenticate, (req, res)=> {
    res.json({
        message: "Authentication Successful"
    })
})


export default authRoutes;