import { Ficheiro } from "./Ficheiro";
import { Pessoa } from "./Pessoa";

export interface Bi {
    idBi: number;
    dataEmicaoBi: Date;
    dataValidacaoBi: Date;
    numeroBI: string;
    codFicheiroBi: number;
    ficheiro: Ficheiro;
    pessoa: Pessoa[];
  }