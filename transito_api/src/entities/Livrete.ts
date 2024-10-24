interface Livrete {
  codLivrete: number;
  codViatura: number;
  codServico: number;
  dataEmissao: Date;
  dataPrimeiroRegistro: Date;
  viatura?: Viatura; // Relacionamento opcional com Viatura
  serivicoviatura?: Serivicoviatura; // Relacionamento opcional com SerivicoViatura
}
