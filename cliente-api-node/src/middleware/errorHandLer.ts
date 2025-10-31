import { Request, Response, NextFunction } from "express";
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err?.status) return res.status(err.status).json({ success: false, message: err.message, details: err.details });
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
};
