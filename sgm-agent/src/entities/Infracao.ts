import { Multa } from "./Multa";
import { Tipoinfracao } from "./Tipoinfracao";

export interface Infracao {
    codInfracao: number;
    codMulta: number;
    codTipoInfracao: number;
    multa_infracao_codMultaTomulta: Multa;
    tipoinfracao: Tipoinfracao;
    multa_multa_codInfracaoToinfracao: Multa[];
  }