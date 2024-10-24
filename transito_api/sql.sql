-- Inserindo dados na tabela ficheiro
INSERT INTO ficheiro (idFicheiro, nomeFicheiro, dataEntrada, dataValidacao, estadoValidacao) VALUES 
(1, 'Ficheiro1', '2023-01-01', '2024-01-01', 'Validado'),
(2, 'Ficheiro2', '2023-02-01', '2024-02-01', 'Pendente');

-- Inserindo dados na tabela pais
INSERT INTO pais (idPais, pais) VALUES 
(1, 'Angola');

-- Inserindo dados na tabela provincia
INSERT INTO provincia (idProvincia, provincia) VALUES 
(1, 'Luanda');

-- Inserindo dados na tabela municipio
INSERT INTO municipio (idMunicipio, idProvincia, municipio) VALUES 
(1, 1, 'Cazenga');

-- Inserindo dados na tabela endereco
INSERT INTO endereco (idEndereco, idMunicipio, descricaoEndereco) VALUES 
(1, 1, 'Rua A, Bairro B');

-- Inserindo dados na tabela contacto
INSERT INTO contacto (idContacto, contacto1, contacto2, email1, email2) VALUES 
(1, '912345678', '923456789', 'email1@example.com', 'email2@example.com');

-- Inserindo dados na tabela bi
INSERT INTO bi (idBi, dataEmicaoBi, dataValidacaoBi, numeroBI, codFicheiroBi) VALUES 
(1, '2019-01-01', '2029-01-01', 'BI12345678', 1);

-- Inserindo dados na tabela pessoa
INSERT INTO pessoa (codPessoa, codEndereco, codNacionalidade, codContacto, nome, genero, estadoCivil, dataCadastro, dataNascimento, codBi, senha) VALUES 
(1, 1, 1, 1, 'João Silva', 'Masculino', 'Casado', '2023-01-01', '1990-01-01', 1, 'senha123'),
(2, 1, 1, 1, 'Maria Santos', 'Feminino', 'Solteira', '2023-01-01', '1992-01-01', 1, 'senha456');

-- Inserindo dados na tabela marca
INSERT INTO marca (codMarca, descMarca) VALUES 
(1, 'Toyota');

-- Inserindo dados na tabela viatura
INSERT INTO viatura (codViatura, codMarca, numeroQuadro, corViatura, MedidasPneumaticos, lotacao, cilindrada, numeroCilindro, conbustivel, peso, tara, tipoCaixa, distanciaEixo, modelo, numeroMatricula) VALUES 
(1, 1, 'QUADRO123', 'Preto', '225/45R17', '5', '2000cc', '4', 'Gasolina', '1500kg', '1200kg', 'Manual', '2.5m', 'Corolla', 'MAT12345');

-- Inserindo dados na tabela serivicoviatura
INSERT INTO serivicoviatura (codServicoViatura, descServico) VALUES 
(1, 'Inspeção');

-- Inserindo dados na tabela livrete
INSERT INTO livrete (codLivrete, codViatura, codServico, dataEmissao, dataPrimeiroRegistro) VALUES 
(1, 1, 1, '2023-01-01', '2023-01-01');

-- Inserindo dados na tabela tiporoubo
INSERT INTO tiporoubo (codTipoRoubo, descTipoRoubo) VALUES 
(1, 'Assalto');

-- Inserindo dados na tabela categoriacarta
INSERT INTO categoriacarta (codCategoriaCarta, descCategoriaCarta, sigla) VALUES 
(1, 'Categoria B', 'B');

-- Inserindo dados na tabela cartaconducao
INSERT INTO cartaconducao (codCartaConducao, dataEmissao, dataValidade, numeroVia, codCategoriaCarta, numeroCarta, dataPrimeiraEmissao, localEmissao, codFicheiroCartaConducao) VALUES 
(1, '2023-01-01', '2028-01-01', '1a Via', 1, 12345, '2023-01-01', 1, 2);

-- Inserindo dados na tabela automobilista
INSERT INTO automobilista (codAutomobilista, codCartaConducao, codPessoa) VALUES 
(1, 1, 1);

-- Inserindo dados na tabela tipoinfracao
INSERT INTO tipoinfracao (codTipoInfracao, descTipoInfracao, valorInfracao) VALUES 
(1, 'Excesso de Velocidade', '10000');

-- Inserindo dados na tabela multa
INSERT INTO multa (codMulta, codAutomobilista, CodViatura, valorMulta, estadoMulta) VALUES 
(1, 1, 1, '10000', 'PENDENTE');

-- Inserindo dados na tabela infracao
INSERT INTO infracao (codInfracao, codMulta, codTipoInfracao) VALUES 
(1, 1, 1);

-- Inserindo dados na tabela alertaroubo
INSERT INTO alertaroubo (codAlertaRoubo, codAutomobilista, codViatura, dataRoubo, enderecoRoubo, codTipoRoubo, descRoubo) VALUES 
(1, 1, 1, '2023-05-01', 'Rua X, Bairro Y', 1, 'Detalhes do roubo');

-- Inserindo dados na tabela usuario
INSERT INTO usuario (codUsuario, senha, bi, numeroAgente, telefone, codPessoa, tipoUsuario) VALUES 
(1, 'senhausuario', 'BI98765432', 'AGT12345', '923456789', 1, 'Admin');




----------------------------------------------------------------------------




-- Inserindo mais dados na tabela ficheiro
INSERT INTO ficheiro (idFicheiro, nomeFicheiro, dataEntrada, dataValidacao, estadoValidacao) VALUES 
(3, 'Ficheiro3', '2023-03-01', '2024-03-01', 'Invalidado'),
(4, 'Ficheiro4', '2023-04-01', '2024-04-01', 'Validado');

-- Inserindo mais dados na tabela pais
INSERT INTO pais (idPais, pais) VALUES 
(2, 'Brasil');

-- Inserindo mais dados na tabela provincia
INSERT INTO provincia (idProvincia, provincia) VALUES 
(2, 'Bengo');

-- Inserindo mais dados na tabela municipio
INSERT INTO municipio (idMunicipio, idProvincia, municipio) VALUES 
(2, 2, 'Caxito');

-- Inserindo mais dados na tabela endereco
INSERT INTO endereco (idEndereco, idMunicipio, descricaoEndereco) VALUES 
(2, 2, 'Rua B, Bairro C');

-- Inserindo mais dados na tabela contacto
INSERT INTO contacto (idContacto, contacto1, contacto2, email1, email2) VALUES 
(2, '934567890', '948765432', 'email3@example.com', 'email4@example.com');

-- Inserindo mais dados na tabela bi
INSERT INTO bi (idBi, dataEmicaoBi, dataValidacaoBi, numeroBI, codFicheiroBi) VALUES 
(2, '2018-01-01', '2028-01-01', 'BI23456789', 2);

-- Inserindo mais dados na tabela pessoa
INSERT INTO pessoa (codPessoa, codEndereco, codNacionalidade, codContacto, nome, genero, estadoCivil, dataCadastro, dataNascimento, codBi, senha) VALUES 
(3, 2, 2, 2, 'Carlos Andrade', 'Masculino', 'Solteiro', '2023-01-01', '1985-01-01', 2, 'senha789'),
(4, 2, 2, 2, 'Ana Costa', 'Feminino', 'Casada', '2023-01-01', '1987-01-01', 2, 'senha012');

-- Inserindo mais dados na tabela marca
INSERT INTO marca (codMarca, descMarca) VALUES 
(2, 'Honda');

-- Inserindo mais dados na tabela viatura
INSERT INTO viatura (codViatura, codMarca, numeroQuadro, corViatura, MedidasPneumaticos, lotacao, cilindrada, numeroCilindro, conbustivel, peso, tara, tipoCaixa, distanciaEixo, modelo, numeroMatricula) VALUES 
(2, 2, 'QUADRO456', 'Branco', '205/55R16', '5', '1800cc', '4', 'Diesel', '1600kg', '1300kg', 'Automático', '2.6m', 'Civic', 'MAT67890');

-- Inserindo mais dados na tabela serivicoviatura
INSERT INTO serivicoviatura (codServicoViatura, descServico) VALUES 
(2, 'Revisão');

-- Inserindo mais dados na tabela livrete
INSERT INTO livrete (codLivrete, codViatura, codServico, dataEmissao, dataPrimeiroRegistro) VALUES 
(2, 2, 2, '2023-02-01', '2023-02-01');

-- Inserindo mais dados na tabela tiporoubo
INSERT INTO tiporoubo (codTipoRoubo, descTipoRoubo) VALUES 
(2, 'Furto');

-- Inserindo mais dados na tabela categoriacarta
INSERT INTO categoriacarta (codCategoriaCarta, descCategoriaCarta, sigla) VALUES 
(2, 'Categoria C', 'C');

-- Inserindo mais dados na tabela cartaconducao
INSERT INTO cartaconducao (codCartaConducao, dataEmissao, dataValidade, numeroVia, codCategoriaCarta, numeroCarta, dataPrimeiraEmissao, localEmissao, codFicheiroCartaConducao) VALUES 
(2, '2023-02-01', '2028-02-01', '1a Via', 2, 54321, '2023-02-01', 2, 4);

-- Inserindo mais dados na tabela automobilista
INSERT INTO automobilista (codAutomobilista, codCartaConducao, codPessoa) VALUES 
(2, 2, 3);

-- Inserindo mais dados na tabela tipoinfracao
INSERT INTO tipoinfracao (codTipoInfracao, descTipoInfracao, valorInfracao) VALUES 
(2, 'Estacionamento Proibido', '5000');

-- Inserindo mais dados na tabela multa
INSERT INTO multa (codMulta, codAutomobilista, CodViatura, valorMulta, estadoMulta) VALUES 
(2, 2, 2, '5000', 'PENDENTE');

-- Inserindo mais dados na tabela infracao
INSERT INTO infracao (codInfracao, codMulta, codTipoInfracao) VALUES 
(2, 2, 2);

-- Inserindo mais dados na tabela alertaroubo
INSERT INTO alertaroubo (codAlertaRoubo, codAutomobilista, codViatura, dataRoubo, enderecoRoubo, codTipoRoubo, descRoubo) VALUES 
(2, 2, 2, '2023-06-01', 'Rua Y, Bairro Z', 2, 'Detalhes do furto');

-- Inserindo mais dados na tabela usuario
INSERT INTO usuario (codUsuario, senha, bi, numeroAgente, telefone, codPessoa, tipoUsuario) VALUES 
(2, 'senhausuario2', 'BI87654321', 'AGT67890', '934567890', 3, 'Transito');


--------------------------------------------------

-- Inserindo mais dados na tabela ficheiro (caso não tenham sido inseridos previamente)
INSERT INTO ficheiro (idFicheiro, nomeFicheiro, dataEntrada, dataValidacao, estadoValidacao) VALUES 
(5, 'Ficheiro5', '2023-05-01', '2024-05-01', 'Validado'),
(6, 'Ficheiro6', '2023-06-01', '2024-06-01', 'Invalidado');

-- Inserindo mais dados na tabela pessoa (caso não tenham sido inseridos previamente)
INSERT INTO pessoa (codPessoa, codEndereco, codNacionalidade, codContacto, nome, genero, estadoCivil, dataCadastro, dataNascimento, codBi, senha) VALUES 
(5, 2, 2, 2, 'Lucas Silva', 'Masculino', 'Solteiro', '2023-02-01', '1990-02-01', 2, 'senha345'),
(6, 2, 2, 2, 'Mariana Lima', 'Feminino', 'Casada', '2023-03-01', '1992-03-01', 2, 'senha678');

-- Inserindo mais dados na tabela viatura (caso não tenham sido inseridos previamente)
INSERT INTO viatura (codViatura, codMarca, numeroQuadro, corViatura, MedidasPneumaticos, lotacao, cilindrada, numeroCilindro, conbustivel, peso, tara, tipoCaixa, distanciaEixo, modelo, numeroMatricula) VALUES 
(3, 1, 'QUADRO789', 'Preto', '225/45R17', '5', '2000cc', '4', 'Gasolina', '1700kg', '1400kg', 'Automático', '2.8m', 'Accord', 'MAT11223');

-- Inserindo mais dados na tabela multa (caso não tenham sido inseridos previamente)
INSERT INTO multa (codMulta, codAutomobilista, CodViatura, valorMulta, estadoMulta) VALUES 
(3, 1, 1, '8000', 'PENDENTE'),
(4, 2, 2, '10000', 'PAGO');


-------------------------

-- Inserindo dados na tabela titulopropriedade
INSERT INTO titulopropriedade (codTituloPropriedade, codPessoa, dataEmissao, dataPrimeiroRegistro, numeroEmissao, codViatura, codFicheiroTituloPropriedade) VALUES 
(1, 5, '2023-02-15', '2023-02-15', 'EMISSAO123', 3, 5),
(2, 6, '2023-03-20', '2023-03-20', 'EMISSAO456', 2, 6);

-- Inserindo dados na tabela pagamentomulta
INSERT INTO pagamentomulta (codPagamentoMulta, codMulta, dataPagamento, valorPago, descCodigoDeposito, codFicheiroPagamento) VALUES 
(1, 4, '2023-04-25', '10000', 'DEP123456', 5),
(2, 3, '2023-05-30', '8000', 'DEP654321', 6);

-- Inserindo dados na tabela funcionario
INSERT INTO funcionario (codFuncionario, codPessoa, codficheiroFotoPerfil, codficheiroFotoPendente, numeroAgente, senha) VALUES 
(1, 5, 5, NULL, 'AGT1122', 1234),
(2, 6, 6, NULL, 'AGT3344', 1234);
