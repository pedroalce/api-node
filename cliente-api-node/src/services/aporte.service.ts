// src/services/aporte.service.ts
import { Aporte } from "../domain/models"
import { calcularValorComJuros, mesesEntre } from "../utils/calc";
import { v4 as uuidv4 } from "uuid";

class AporteService {
    private aportes: Aporte[] = [];
    private locks = new Set<number>(); // lock por colaboradorId (simples)

    // registrar aporte (atomicidade/lock simples)
    async registrarAporte(colaboradorId: number, valor: number, data: string, fundoId?: string) {
        // validações básicas
        if (valor < 10) throw new Error("Aporte minimo: R$10");
        // lock simples
        while (this.locks.has(colaboradorId)) await new Promise(r => setTimeout(r, 10));
        this.locks.add(colaboradorId);
        try {
            const novo: Aporte = { id: uuidv4(), colaboradorId, valor, data, fundoId };
            this.aportes.push(novo);
            const saldo = this.calcularSaldo(colaboradorId);
            return { novo, saldo };
        } finally {
            this.locks.delete(colaboradorId);
        }
    }

    calcularSaldo(colaboradorId: number, taxaMensalPorFundo: Record<string, number> = {}) {
        const hoje = new Date();
        return this.aportes
            .filter(a => a.colaboradorId === colaboradorId)
            .reduce((acc, a) => {
                const meses = mesesEntre(a.data, hoje);
                const taxa = a.fundoId ? (taxaMensalPorFundo[a.fundoId] ?? 0.005) : 0.005;
                return acc + calcularValorComJuros(a.valor, meses, taxa);
            }, 0);
    }

    extrato(colaboradorId: number) {
        return this.aportes.filter(a => a.colaboradorId === colaboradorId);
    }

    // para testes/limpeza
    clear() { this.aportes = []; }
}

export const aporteService = new AporteService();
