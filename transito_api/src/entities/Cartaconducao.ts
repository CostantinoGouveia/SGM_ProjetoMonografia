interface Cartaconducao {
    codCartaConducao: number;
    dataEmissao: Date;
    dataValidade: Date;
    numeroVia: string;
    codCategoriaCarta: number;
    numeroCarta: number;
    dataPrimeiraEmissao: Date;
    localEmissao: number;
    codFicheiroCartaConducao: number;
    automobilista: Automobilista[];
    categoriacarta: Categoriacarta;
    ficheiro: Ficheiro;
  }