import { Request, Response, NextFunction } from "express";
export declare const createProductController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createProductVariantController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getInventoryController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateInventoryController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createProductImageController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getProductImagesController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateProductImagesController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteProductImagesController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const productListingsController: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateProductController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteProductController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateProductStatusController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=products.controller.d.ts.map