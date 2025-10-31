import { z } from "zod"

export const aporteSchema = z.object({
    colaboradorId: z.preprocess((v) => Number(v), z.number().int().positive()),
    valor: z.preprocess((v) => Number(v), z.number().positive().max(1_000_000)),
    data: z.string().refine((s) => !Number.isNaN(Date.parse(s)), { message: "data invalida, use ISO" }),
    FundoId: z.string().optional()
});