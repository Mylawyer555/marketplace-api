import { Request, Response, NextFunction } from "express";
export declare const register: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
export declare const login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const refreshToken: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const logOut: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const changePasswordController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const forgotPasswordController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const resetPasswordController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.controller.d.ts.map