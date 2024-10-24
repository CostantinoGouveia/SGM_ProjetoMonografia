import { Endereco } from "./Endereco";
import { Provincia } from "./Provincia";

export interface Municipio {
    idMunicipio: number;
    idProvincia: number;
    municipio: string;
    endereco: Endereco[];
    provincia: Provincia;
  }