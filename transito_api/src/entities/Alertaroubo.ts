interface Alertaroubo {
    codAlertaRoubo: number;
    codAutomobilista: number;
    codViatura: number;
    dataRoubo: Date;
    enderecoRoubo: string;
    codTipoRoubo: number;
    descRoubo: string;
    automobilista: Automobilista;
    tiporoubo: Tiporoubo;
    viatura: Viatura;
  }