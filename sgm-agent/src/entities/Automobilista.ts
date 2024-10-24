import { Alertaroubo } from "./Alertaroubo";
import { Cartaconducao } from "./Cartaconducao";
import { Multa } from "./Multa";
import { Pessoa } from "./Pessoa";

export interface Automobilista {
    codAutomobilista: number;
    codCartaConducao: number;
    codPessoa: number;
    alertaroubo: Alertaroubo[];
    cartaconducao: Cartaconducao;
    pessoa: Pessoa;
    multa: Multa[];
  }