import { Municipio } from "./Municipio";
import { Pessoa } from "./Pessoa";

export interface Endereco {
    idEndereco: number;
    idMunicipio: number;
    descricaoEndereco: string;
    municipio: Municipio;
    pessoa: Pessoa[];
  }