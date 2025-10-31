// src/tests/aporte.test.ts
import request from "supertest";
import express from "express";
import aporteRoutes from "../src/routes/aporte.routes";
import { aporteService } from "../src/services/aporte.service";

const app = express();
app.use(express.json());
app.use("/api", aporteRoutes);

beforeEach(() => aporteService.clear());

test("POST /api/aportes cria aporte e retorna saldo > valor", async () => {
    const res = await request(app)
        .post("/api/aportes")
        .send({ colaboradorId: 1, valor: 1000, data: "2024-01-01" });
    expect(res.status).toBe(201);
    expect(res.body.saldoAtual).toBeGreaterThanOrEqual(1000);
});

test("GET /api/saldo/:id retorna 0 quando sem aportes", async () => {
    const res = await request(app).get("/api/saldo/2");
    expect(res.status).toBe(200);
    expect(res.body.saldo).toBe(0);
});

test("POST /api/aportes valida payload inválido", async () => {
    const res = await request(app).post("/api/aportes").send({ colaboradorId: "x", valor: -10, data: "nope" });
    expect(res.status).toBe(422);
    expect(res.body.errors).toEqual(
        expect.arrayContaining([
            expect.objectContaining({ path: "colaboradorId" }),
            expect.objectContaining({ path: "valor" }),
            expect.objectContaining({ path: "data" })
        ])
    );
});

