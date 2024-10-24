interface Infracao {
    codInfracao: number;
    codMulta: number;
    codTipoInfracao: number;
    multa_infracao_codMultaTomulta: Multa;
    tipoinfracao: Tipoinfracao;
    multa_multa_codInfracaoToinfracao: Multa[];
  }