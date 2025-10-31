// src/routes/aporte.routes.ts
import { Router } from "express";
import { postAporte, getSaldo, getExtrato } from "../controllers/aporte.controller";
import { validateBody } from "../middleware/validate";
import { aporteSchema } from "../validation/aporte.schema";

const router = Router();
router.post("/aportes", validateBody(aporteSchema), postAporte);
router.get("/saldo/:colaboradorId", getSaldo);
router.get("/extrato/:colaboradorId", getExtrato);

export default router;
