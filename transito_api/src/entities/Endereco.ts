interface Endereco {
    idEndereco: number;
    idMunicipio: number;
    descricaoEndereco: string;
    municipio: Municipio;
    pessoa: Pessoa[];
  }