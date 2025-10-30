export function mesesEntre(inicioISO: string, fim = new Date()): number {
    const inicio = new Date(inicioISO);
    return (fim.getFullYear() - inicio.getFullYear()) * 12 + (fim.getMonth() - inicio.getMonth())
}

export function calcularValorComJuros(valor: number, meses: number, taxaMensal = 0.005) {
    return valor * Math.pow(1 + taxaMensal, meses)
}