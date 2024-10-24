import { Automobilista } from "./Automobilista";
import { Categoriacarta } from "./Categoriacarta";
import { Ficheiro } from "./Ficheiro";

export interface Cartaconducao {
    codCartaConducao: number;
    dataEmissao: Date;
    dataValidade: Date;
    numeroVia: string;
    codCategoriaCarta: number;
    numeroCarta: number;
    dataPrimeiraEmissao: Date;
    localEmissao: number;
    codFicheiroCartaConducao: number;
    automobilista: Automobilista[];
    categoriacarta: Categoriacarta;
    ficheiro: Ficheiro;
  }