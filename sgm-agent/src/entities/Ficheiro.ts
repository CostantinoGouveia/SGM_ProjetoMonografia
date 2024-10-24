import { Bi } from "./Bi";
import { Cartaconducao } from "./Cartaconducao";
import { Funcionario } from "./Funcionario";
import { Pagamentomulta } from "./Pagamentomulta";
import { Titulopropriedade } from "./Titulopropriedade";

export interface Ficheiro {
    idFicheiro: number;
    nomeFicheiro: string;
    dataEntrada?: string;
    dataValidacao?: string;
    estadoValidacao: FicheiroEstadoValidacao;
    bi: Bi[];
    cartaconducao: Cartaconducao[];
    funcionario: Funcionario[];
    pagamentomulta: Pagamentomulta[];
    titulopropriedade: Titulopropriedade[];
  }

  enum FicheiroEstadoValidacao {
    Pendente = "Pendente",
    Validado = "Validado",
    Invalidado = "Invalidado"
  }