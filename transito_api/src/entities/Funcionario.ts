interface Funcionario {
    codFuncionario: number;
    codPessoa: number;
    codficheiroFotoPerfil: number;
    codficheiroFotoPendente?: number;
    numeroAgente?: string;
    senha: number;
    ficheiro: Ficheiro;
    pessoa: Pessoa;
  }