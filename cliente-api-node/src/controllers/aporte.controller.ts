import { Request, Response } from "express";
import { aporteService } from "../services/aporte.service";

export async function postAporte(req: Request, res: Response) {
    try {
        const { colaboradorId, valor, data, fundoId } = req.body;
        const { novo, saldo } = await aporteService.registrarAporte(Number(colaboradorId), Number(valor), data, fundoId);
        res.status(201).json({ success: true, aporte: novo, saldoAtual: saldo });
    } catch (err: any) {
        res.status(400).json({ success: false, message: err.message });
    }
}

export function getSaldo(req: Request, res: Response) {
    const colaboradorId = Number(req.params.colaboradorId);
    const saldo = aporteService.calcularSaldo(colaboradorId);
    res.json({ colaboradorId, saldo });
}

export function getExtrato(req: Request, res: Response) {
    const colaboradorId = Number(req.params.colaboradorId);
    const extrato = aporteService.extrato(colaboradorId);
    res.json({ colaboradorId, extrato });
}
