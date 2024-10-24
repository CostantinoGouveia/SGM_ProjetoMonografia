interface Ficheiro {
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