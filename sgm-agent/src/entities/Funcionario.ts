import { Ficheiro } from "./Ficheiro";
import { Pessoa } from "./Pessoa";

export interface Funcionario {
    codFuncionario: number;
    codPessoa: number;
    codficheiroFotoPerfil: number;
    codficheiroFotoPendente?: number;
    numeroAgente?: string;
    senha: number;
    ficheiro: Ficheiro;
    pessoa: Pessoa;
  }