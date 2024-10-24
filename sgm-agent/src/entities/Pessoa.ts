import { Automobilista } from "./Automobilista";
import { Bi } from "./Bi";
import { Contacto } from "./Contacto";
import { Endereco } from "./Endereco";
import { Funcionario } from "./Funcionario";
import { Pais } from "./Pais";
import { Titulopropriedade } from "./Titulopropriedade";

export interface Pessoa {
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