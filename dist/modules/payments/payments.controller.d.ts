import { Request, Response, NextFunction } from "express";
export declare const createPaymentController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const processPaymentController: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const failPaymentController: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const refundPaymentController: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=payments.controller.d.ts.map