import { Livrete } from "./Livrete";

export interface Serivicoviatura {
    codServicoViatura: number;
    descServico: string;
    livrete: Livrete[];
  }