import { Municipio } from "./Municipio";

export interface Provincia {
    idProvincia: number;
    provincia: string;
    municipio: Municipio[];
  }