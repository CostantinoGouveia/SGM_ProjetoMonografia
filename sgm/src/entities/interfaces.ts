import { NOMEM } from "dns";

export interface Usuario {
  codUsuario: number;
  senha: string;
  bi: string;
  numeroAgente: string;
  telefone: string;
  codPessoa: number;
  tipoUsuario: UsuarioTipoUsuario;
  pessoa: Pessoa;
}

export interface Alertaroubo {
  codAlertaRoubo: number;
  codAutomobilista: number;
  codEndereco?: number;
  codViatura: number;
  status?: string;
  dataRoubo: Date;
  dataFeita: Date;
  horaFeita: Date;
  codTipoRoubo: number;
  descRoubo: string;
  endereco?: Endereco;
  automobilista: Automobilista;
  tiporoubo: Tiporoubo;
  viatura: Viatura;
}

export interface Automobilista {
  codAutomobilista: number;
  codCartaConducao: number;
  codPessoa: number;
  alertaroubo: Alertaroubo[];
  cartaconducao: Cartaconducao;
  pessoa: Pessoa;
  multa: Multa[];
}

export interface Bi {
  idBi: number;
  dataEmicaoBi: Date;
  dataValidacaoBi: Date;
  numeroBI: string;
  codFicheiroBi: number;
  ficheiro: Ficheiro;
  pessoa: Pessoa[];
}

export interface Cartaconducao {
  codCartaConducao: number;
  dataEmissao: Date;
  dataValidade: Date;
  numeroVia: string;
  codCategoriaCarta: number;
  numeroCarta: string;
  dataPrimeiraEmissao: Date;
  localEmissao: number;
  codFicheiroCartaConducao: number;
  automobilista: Automobilista[];
  categoriacarta: Categoriacarta;
  ficheiro: Ficheiro;
}

export interface Categoriacarta {
  codCategoriaCarta: number;
  descCategoriaCarta: string;
  sigla: string;
  cartaconducao: Cartaconducao[];
}

export interface Contacto {
  idContacto: number;
  contacto1: string;
  contacto2?: string;
  email1?: string;
  email2?: string;
  pessoa: Pessoa[];
}

export interface Endereco {
  idEndereco: number;
  idMunicipio: number;
  descricaoEndereco: string;
  municipio: Municipio;
  pessoa: Pessoa[];
  alertaroubo: Alertaroubo[];
}

export interface Ficheiro {
  idFicheiro: number;
  nomeFicheiro: string;
  dataEntrada?: string;
  dataValidacao?: string;
  estadoValidacao?: FicheiroEstadoValidacao;
  bi: Bi[];
  cartaconducao: Cartaconducao[];
  funcionario: Funcionario[];
  pagamentomulta: Pagamentomulta[];
  titulopropriedade: Titulopropriedade[];
}

export interface Funcionario {
  codFuncionario: number;
  codPessoa: number;
  codficheiroFotoPerfil: number;
  codficheiroFotoPendente?: number;
  numeroAgente?: string;
  senha: number;
  ficheiro: Ficheiro;
  pessoa: Pessoa;
  multa: Multa[];
}

export interface Infracao {
  codInfracao: number;
  codMulta: number;
  codTipoInfracao: number;
  multa: Multa;
  tipoinfracao: Tipoinfracao;
}

export interface Viatura {
  codViatura: number;
  MedidasPneumaticos: string;
  cilindrada: string;
  codMarca: number;
  conbustivel: string;
  corViatura: string;
  distanciaEixo: string;
  lotacao: string;
  modelo: string;
  numeroCilindro: string;
  numeroQuadro: string;
  peso: string;
  tara: string;
  tipoCaixa: string;
  numeroMatricula: string;
  alertaroubo: Alertaroubo[];
  livrete: Livrete[];
  multa: Multa[];
  titulopropriedade: Titulopropriedade[];
  marca: Marca;
  pessoa: Pessoa[];
}

export interface Marca {
  codMarca: number;
  descMarca: string;
  viatura: Viatura[];
}

export interface Multa {
  codMulta: number;
  codAutomobilista?: number;
  CodViatura?: number;
  valorMulta: string;
  estadoMulta: MultaEstadoMulta;
  data: Date;
  dataPagamento?: Date;
  horaFeita: Date;
  descMulta: string;
  codFuncionario?: number;
  dataLimite: Date;
  statusTribunal: boolean;
  infracao: Infracao[];
  reclamacao: Reclamacao[];
  automobilista?: Automobilista;
  viatura?: Viatura;
  funcionario?: Funcionario;
  pagamentomulta: Pagamentomulta[];
}

export interface Reclamacao {
  codReclamacao: number;
  codMulta: number;
  dataReclamacao: Date;
  motivo: string;
  status: string;
  observacao?: string;
  multa: Multa;
  notificacaoreclamacao: Notificacaoreclamacao[],
}

export interface Notificacaoreclamacao {
        codNotificacao: number,
        codReclamacao: number,
        dataNotificacao: Date,
        status: string,
        mensagem: string,
        reclamacao: Reclamacao
}


export interface Municipio {
  idMunicipio: number;
  idProvincia: number;
  municipio: string;
  endereco: Endereco[];
  provincia: Provincia;
}

export interface Pagamentomulta {
  codPagamentoMulta: number;
  codMulta: number;
  dataCriacao: Date;
  referencia: string;
  status: string;
  valorPago: string;
  descCodigoDeposito: string;
  codFicheiroPagamento?: number;
  multa: Multa;
  ficheiro?: Ficheiro;
}

export interface Pais {
  idPais: number;
  pais: string;
  pessoa: Pessoa[];
}

export interface Pessoa {
  codPessoa: number;
  codEndereco?: number;
  codNacionalidade?: number;
  codContacto?: number;
  nome: string;
  genero: PessoaGenero;
  estadoCivil: PessoaEstadoCivil;
  dataCadastro?: Date;
  dataNascimento: Date;
  codBi: number;
  senha: string;
  automobilista: Automobilista[];
  funcionario: Funcionario[];
  contacto?: Contacto;
  endereco?: Endereco;
  pais?: Pais;
  bi: Bi;
  titulopropriedade: Titulopropriedade[];
  usuario: Usuario[];
}

export interface Provincia {
  idProvincia: number;
  provincia: string;
  municipio: Municipio[];
}

export interface Serivicoviatura {
  codServicoViatura: number;
  descServico: string;
  livrete: Livrete[];
}

export interface Tipoinfracao {
  codTipoInfracao: number;
  descTipoInfracao: string;
  valorInfracao: string;
  infracao: Infracao[];
}

export interface Tiporoubo {
  codTipoRoubo: number;
  descTipoRoubo: string;
  alertaroubo: Alertaroubo[];
}

export interface Titulopropriedade {
  codTituloPropriedade: number;
  codPessoa: number;
  dataEmissao: Date;
  dataPrimeiroRegistro: Date;
  numeroEmissao: string;
  codViatura: number;
  codFicheiroTituloPropriedade: number;
  pessoa: Pessoa;
  viatura: Viatura;
  ficheiro: Ficheiro;
}

export interface Livrete {
  codLivrete: number;
  codViatura: number;
  codServico: number;
  dataEmissao: Date;
  dataPrimeiroRegistro: Date;
  viatura: Viatura;
  serivicoviatura: Serivicoviatura;
}

// Enums
enum UsuarioTipoUsuario {
  Transito = "Transito",
  Automobilista = "Automobilista",
  Admin = "Admin"
}

enum PessoaGenero {
  Masculino = "Masculino",
  Feminino = "Feminino"
}

enum PessoaEstadoCivil {
  Solteiro = "Solteiro",
  Casado = "Casado",
  Solteira = "Solteira",
  Casada = "Casada"
}

enum FicheiroEstadoValidacao {
  Pendente = "Pendente",
  Validado = "Validado",
  Invalidado = "Invalidado"
}

enum MultaEstadoMulta {
  PAGO = "PAGO",
  NAO_PAGO = "NAO PAGO",
  PENDENTE = "PENDENTE"
}