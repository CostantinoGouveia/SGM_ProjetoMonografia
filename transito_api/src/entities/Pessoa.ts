interface Pessoa {
    codPessoa: number;
    codEndereco?: number;
    codNacionalidade?: number;
    codContacto?: number;
    nome: string;
    genero: PessoaGenero;
    estadoCivil: PessoaEstadoCivil;
    dataCadastro?: string;
    dataNascimento: string;
    codBi: number;
    senha: string;
    automobilista: Automobilista[];
    funcionario: Funcionario[];
    contacto?: Contacto;
    endereco?: Endereco;
    pais?: Pais;
    bi: Bi;
    titulopropriedade: Titulopropriedade[];
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