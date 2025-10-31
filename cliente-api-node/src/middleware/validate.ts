import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateBody = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        const issues = result.error.errors.map(e => ({ path: e.path.join("."), message: e.message }));
    }
    req.body = result.data;
    return next();
}; 