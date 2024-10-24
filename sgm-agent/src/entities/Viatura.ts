import { Alertaroubo } from "./Alertaroubo";
import { Livrete } from "./Livrete";
import { Marca } from "./Marca";
import { Multa } from "./Multa";
import { Titulopropriedade } from "./Titulopropriedade";

export interface Viatura {
    codViatura: number;
    codMarca: number;
    numeroQuadro: string;
    corViatura: string;
    MedidasPneumaticos: string;
    lotacao: string;
    cilindrada: string;
    numeroCilindro: string;
    conbustivel: string;
    peso: string;
    tara: string;
    tipoCaixa: string;
    distanciaEixo: string;
    modelo: string;
    numeroMatricula: string;
    marca?: Marca;
    livrete?: Livrete[]; 
    alertaroubo?: Alertaroubo[]; 
    multa?: Multa[]; 
    titulopropriedade?: Titulopropriedade[];
  }
  