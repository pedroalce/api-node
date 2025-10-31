// src/errors/ApiError.ts
export class ApiError extends Error {
    public status: number;
    public details?: any;
    constructor(message: string, status = 400, details?: any) {
        super(message); this.status = status; this.details = details;
    }
}
