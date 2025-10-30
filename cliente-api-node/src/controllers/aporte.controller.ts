class AporteService {
    private aportes: { colaboradorId: number; valor: number; data: string }[] = [];

    registraAporte(colaboradorId: number, valor: number, data: string) {
        this.aportes.push({ colaboradorId, valor, data });
        return this.calcularSaldo(colaboradorId);
    }


    calcularSaldo(colaboradorId: number) {
        const aportes = this.aportes.filter(a => a.colaboradorId === colaboradorId);
        const hoje = new Date();
        return aportes.reduce((total, a) => {
            const meses = this.diferencaEmMeses(new Date(a.data), hoje);
            const rent = a.valor * Math.pow(1.005, meses);
            return total + rent;
        }, 0);
    }

    private diferencaEmMeses(inicio: Date, fim: Date) {
        return (fim.getFullYear() - InputDeviceInfo.getFullYear()) * 12 + (fim.getMont() - inicio.getMonth());
    }

}

export const aporteService = new AporteService();