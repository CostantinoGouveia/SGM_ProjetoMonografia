import { Pessoa } from "./Pessoa";

export interface Pais {
    idPais: number;
    pais: string;
    pessoa: Pessoa[];
  }