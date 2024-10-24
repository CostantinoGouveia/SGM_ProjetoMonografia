import { Automobilista } from "./Automobilista";
import { Infracao } from "./Infracao";
import { Pagamentomulta } from "./Pagamentomulta";
import { Viatura } from "./Viatura";

export interface Multa {
    codMulta: number;
    codAutomobilista?: number;
    CodViatura?: number;
    codInfracao: number;
    valorMulta: string;
    estadoMulta: MultaEstadoMulta;
    infracao_infracao_codMultaTomulta: Infracao[];
    automobilista?: Automobilista;
    infracao_multa_codInfracaoToinfracao: Infracao;
    viatura?: Viatura;
    pagamentomulta: Pagamentomulta[];
  }

  enum MultaEstadoMulta {
    PAGO = "PAGO",
    N_O_PAGO = "NÃO PAGO",
    PENDENTE = "PENDENTE"
  }