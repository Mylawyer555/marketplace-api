import { Request, Response, NextFunction } from "express";
export declare const returnsController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const returnStatusTransitionController: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=returns.controller.d.ts.map