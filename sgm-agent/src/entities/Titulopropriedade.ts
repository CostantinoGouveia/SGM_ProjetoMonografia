import { Ficheiro } from "./Ficheiro";
import { Pessoa } from "./Pessoa";
import { Viatura } from "./Viatura";

export interface Titulopropriedade {
    codTituloPropriedade: number;
    codPessoa: number;
    dataEmissao: Date;
    dataPrimeiroRegistro: Date;
    numeroEmissao: string;
    codViatura: number;
    codFicheiroTituloPropriedade: number;
    pessoa: Pessoa;
    viatura: Viatura;
    ficheiro: Ficheiro;
  }