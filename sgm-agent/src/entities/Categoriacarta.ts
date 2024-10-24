import { Cartaconducao } from "./Cartaconducao";

export interface Categoriacarta {
    codCategoriaCarta: number;
    descCategoriaCarta: string;
    sigla: string;
    cartaconducao: Cartaconducao[];
  }