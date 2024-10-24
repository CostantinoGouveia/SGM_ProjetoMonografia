import { Ficheiro } from "./Ficheiro";
import { Multa } from "./Multa";

export interface Pagamentomulta {
    codPagamentoMulta: number;
    codMulta: number;
    dataPagamento: Date;
    valorPago: string;
    descCodigoDeposito: string;
    codFicheiroPagamento: number;
    multa: Multa;
    ficheiro: Ficheiro;
  }