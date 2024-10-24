import { Infracao } from "./Infracao";

export interface Tipoinfracao {
    codTipoInfracao: number;
    descTipoInfracao: string;
    valorInfracao: string;
    infracao: Infracao[];
  }