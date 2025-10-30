export type FundId = string;

export interface Aporte {
    id: string;
    colaboradorId: number;
    valor: number;
    data: string;
    fundoId?: FundId;
}

export interface Conta {
    colaboradorId: number;
    //saldo calculado nao persistido, historico de aportes
}