interface Viatura {
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
  