INSERT INTO `alertaroubo` (`codAlertaRoubo`, `codAutomobilista`, `codEndereco`, `codViatura`, `status`, `dataRoubo`, `dataFeita`, `horaFeita`, `codTipoRoubo`, `descRoubo`) VALUES
(1, 1, 1, 1, 'Ativo', '2023-05-01', '2024-10-31', '12:09:52', 1, 'Detalhes do roubo'),
(3, 1, 1, 2, 'Inativo', '2024-10-17', '2024-10-17', '12:09:52', 1, 'wqqdsqwedwdwdewdwedwdew');

INSERT INTO `automobilista` (`codAutomobilista`, `codCartaConducao`, `codPessoa`) VALUES
(1, 1, 1),
(8, 7, 8),
(9, 8, 12);

INSERT INTO `bi` (`idBi`, `dataEmicaoBi`, `dataValidacaoBi`, `numeroBI`, `codFicheiroBi`) VALUES
(1, '2019-01-01', '2029-01-01', 'BI12345678', 1),
(17, '2024-10-31', '2024-11-29', '00010001000', 1),
(19, '2024-10-31', '2024-11-29', '000700070007', 1),
(21, '2024-11-03', '2024-11-29', '0072011112LA040', 1),
(22, '2024-11-02', '2024-11-26', '0963258975LA048', 1),
(23, '2024-10-31', '2024-11-28', '0094451554LA048', 1);

INSERT INTO `cartaconducao` (`codCartaConducao`, `dataEmissao`, `dataValidade`, `numeroVia`, `codCategoriaCarta`, `numeroCarta`, `dataPrimeiraEmissao`, `localEmissao`, `codFicheiroCartaConducao`) VALUES
(1, '2023-01-01', '2028-01-01', '1a Via', 1, '12345', '2023-01-01', '1', 2),
(7, '2024-10-31', '2024-11-29', '1', 1, '789987', '2024-11-29', 'luanda', 1),
(8, '2024-10-31', '2024-11-08', '1', 1, '88400la', '2024-11-13', 'luanda', 1);

INSERT INTO `categoriacarta` (`codCategoriaCarta`, `descCategoriaCarta`, `sigla`) VALUES
(1, 'Categoria B', 'B');

INSERT INTO `contacto` (`idContacto`, `contacto1`, `contacto2`, `email1`, `email2`) VALUES
(1, '912345678', '923456789', 'email1@example.com', 'email2@example.com'),
(17, '927170408', '', 'gouveiaJacy2@gmail.com', 'gouveiaelisabeth2@gmail.com'),
(19, '938125665', '958029889', 'costantino112.ngunza938@gmail.com', 'costantino.ngunza938@gmail.com'),
(21, '996125665', NULL, 'branca.ngunza938@gmail.com', ''),
(22, '929467353', NULL, 'sergioFalaisso2@gmail.com', 'Sergiojamena2@gmail.com'),
(23, '9448555556', NULL, 'mw-14@gmail.com', '');

INSERT INTO `endereco` (`idEndereco`, `idMunicipio`, `descricaoEndereco`) VALUES
(1, 1, 'Rua A, Bairro B'),
(14, 1, 'Angola-Luanda-Belas-Benfica'),
(16, 2, 'Angola-Luanda-Talatona-Benfica'),
(18, 1, 'Angola-Luanda-Cazenga-Samba'),
(19, 2, 'Angola-Luanda-Belas-Canhanga'),
(20, 1, 'Angola-Luanda-estalagem');

INSERT INTO `ficheiro` (`idFicheiro`, `nomeFicheiro`, `dataEntrada`, `dataValidacao`, `estadoValidacao`) VALUES
(1, 'Ficheiro1', '2023-01-01', '2024-01-01', 'Validado'),
(2, 'Ficheiro2', '2023-02-01', '2024-02-01', 'Pendente');

INSERT INTO `funcionario` (`codFuncionario`, `codPessoa`, `codficheiroFotoPerfil`, `codficheiroFotoPendente`, `numeroAgente`, `senha`) VALUES
(2, 2, 1, NULL, 'AGT3344', 1234),
(4, 10, 1, NULL, '312113', 1),
(5, 11, 1, NULL, '789489', 1);

-- Tabela: infracao
INSERT INTO `infracao` (`codInfracao`, `codMulta`, `codTipoInfracao`) VALUES
(1, 1, 1),
(3, 3, 1),
(4, 3, 3),
(5, 4, 1),
(6, 4, 3);

-- Tabela: livrete
INSERT INTO `livrete` (`codLivrete`, `codViatura`, `codServico`, `dataEmissao`, `dataPrimeiroRegistro`) VALUES
(1, 1, 1, '2023-01-01', '2023-01-01');

-- Tabela: marca
INSERT INTO `marca` (`codMarca`, `descMarca`) VALUES
(1, 'Toyota'),
(2, 'NISSAN'),
(3, 'Jetour');

-- Tabela: multa
INSERT INTO `multa` (`codMulta`, `codAutomobilista`, `CodViatura`, `valorMulta`, `estadoMulta`, `data`, `dataPagamento`, `horaFeita`, `descMulta`, `codFuncionario`, `dataLimite`, `statusTribunal`) VALUES
(1, 1, 1, '10000', 'PENDENTE', '2024-11-06', NULL, '12:09:52', '', 2, '2024-10-13 00:00:00.000', 1),
(3, 1, NULL, '12100', 'PENDENTE', '2024-10-09', '2024-10-31 13:16:59', '12:09:52', 'JHIVGuvhbekwbldewobvfrwhv', 2, '2024-11-15 00:00:00.000', 0),
(4, 9, NULL, '1064800', 'PENDENTE', '2024-11-21', '2024-11-21 11:45:02', '12:31:16', 'Muito barulhento na estrada', 2, '2024-12-06 00:00:00.000', 0);

-- Tabela: municipio
INSERT INTO `municipio` (`idMunicipio`, `idProvincia`, `municipio`) VALUES
(1, 1, 'Cazenga'),
(2, 1, 'Talatona'),
(3, 4, 'Cabinda'),
(4, 3, 'Huambo'),
(5, 2, 'Benguela'),
(6, 2, 'Muquifo');

-- Tabela: pagamentomulta
INSERT INTO `pagamentomulta` (`codPagamentoMulta`, `codMulta`, `dataCriacao`, `referencia`, `status`, `valorPago`, `descCodigoDeposito`, `codFicheiroPagamento`) VALUES
(1, 1, '2023-04-25 00:00:00.000', '1234567890', 'Nao Pago', '10000', 'DEP123456', 1),
(2, 3, '2023-05-30 00:00:00.000', '087654321', 'PAGO', '8000', 'DEP654321', 1),
(3, 4, '2024-11-21 11:31:16.039', 'REF-G69BTTNPV', 'PAGO', '1064800', 'TR-REF-IF086AQMB', NULL);

-- Tabela: pais
INSERT INTO `pais` (`idPais`, `pais`) VALUES
(4, 'Africa do Sul'),
(1, 'Angola'),
(2, 'Moçambique'),
(3, 'Namibia');

-- Tabela: pessoa
INSERT INTO `pessoa` (`codPessoa`, `codEndereco`, `codNacionalidade`, `codContacto`, `nome`, `genero`, `estadoCivil`, `dataCadastro`, `dataNascimento`, `codBi`, `senha`) VALUES
(1, 1, 1, 1, 'João Silva', 'Masculino', 'Casado', '2023-01-01 00:00:00', '1990-01-01', 1, 'senha123'),
(2, 14, 1, 17, 'Maria Santos', 'Feminino', 'Solteira', '2023-01-01 00:00:00', '1992-01-01', 17, 'senha456'),
(8, 16, 1, 19, 'Costantino Virgílio Ngunza Gouveia', 'Masculino', 'Solteiro', '2024-11-18 11:06:50', '2024-10-31', 19, '1'),
(10, 18, 1, 21, 'Branca Ngunza Gouveia', 'Feminino', 'Solteiro', '2024-11-21 11:49:32', '2024-10-31', 21, '1'),
(11, 19, 1, 22, 'Sergio Jamena', 'Masculino', 'Casado', '2024-11-21 11:52:58', '2024-10-31', 22, '1'),
(12, 20, 1, 23, 'Marcio Welepy', 'Masculino', 'Solteiro', '2024-11-21 12:22:33', '2024-10-31', 23, '1');


-- Inserindo dados para a tabela `provincia`
INSERT INTO `provincia` (`idProvincia`, `provincia`) VALUES
(1, 'Luanda'),
(2, 'Benguela'),
(3, 'Huambo'),
(4, 'Cabinda');

-- Inserindo dados para a tabela `serivicoviatura`
INSERT INTO `serivicoviatura` (`codServicoViatura`, `descServico`) VALUES
(1, 'Inspeção');

-- Inserindo dados para a tabela `tipoinfracao`
INSERT INTO `tipoinfracao` (`codTipoInfracao`, `descTipoInfracao`, `valorInfracao`) VALUES
(1, 'Excesso de Velocidade', '10000'),
(2, 'Parar em cima da passadeira', '2000'),
(3, 'Sem macaca', '2100');

-- Inserindo dados para a tabela `tiporoubo`
INSERT INTO `tiporoubo` (`codTipoRoubo`, `descTipoRoubo`) VALUES
(1, 'Assalto');

-- Inserindo dados para a tabela `titulopropriedade`
INSERT INTO `titulopropriedade` (`codTituloPropriedade`, `codPessoa`, `dataEmissao`, `dataPrimeiroRegistro`, `numeroEmissao`, `codViatura`, `codFicheiroTituloPropriedade`) VALUES
(1, 1, '2023-02-15', '2023-02-15', 'EMISSAO123', 1, 1),
(3, 1, '2024-10-12', '2024-10-01', '3', 2, 1),
(4, 8, '2024-04-02', '2024-04-02', '1', 3, 1),
(5, 12, '2024-11-01', '2024-11-22', '1', 4, 1);

-- Inserindo dados para a tabela `usuario`
INSERT INTO `usuario` (`codUsuario`, `senha`, `bi`, `numeroAgente`, `telefone`, `codPessoa`, `tipoUsuario`, `numeroCarta`, `primeiroLogin`) VALUES
(1, '$2b$04$ASIWNze1X.u9JRCdOFsMA.FmkFMBw.nuZe4NHlnwCOX0w7XPH4Lk2', 'BI98765432', 'AGT12345', '923456789', 2, 'Admin', NULL, 0),
(2, '$2b$04$6ntkAN5CU75jth3tg.4veeoRJF.sNzgFNHC5EaoSMYpfnhHuW/rBm', 'BI123456', '', '938125665', 1, 'Automobilista', '12345', 0),
(5, '$2b$04$F/rAI/cnQj3UKQTx9NJLf.kmH2auc8IyaB2nalqObvJM6BVAPJTdq', '000700070007', '', '938125665', 8, 'Automobilista', '789987', 0),
(6, '$2b$04$zOgWzhkJzZWPvGDzyS/6FOD5aod.EGEiNqPeW82ZZJ60TCXqryic2', '0072011112LA040', '312113', '996125665', 10, 'Agente', '', 1),
(7, '$2b$04$wdSaf/Vl8sHNilQ/cUXEqeh6altHC49BOOae5oZ1SRupOfaDHPuKG', '0963258975LA048', '789489', '929467353', 11, 'Transito', '', 1),
(8, '$2b$04$Rwuqpsns7c8yGH50tKDaQ.UoYOKKmVWstadqnsSjL6lDEmFR9bL..', '0094451554LA048', '', '9448555556', 12, 'Automobilista', '88400la', 0);

-- Inserindo dados para a tabela `viatura`
INSERT INTO `viatura` (`codViatura`, `MedidasPneumaticos`, `cilindrada`, `codMarca`, `conbustivel`, `corViatura`, `distanciaEixo`, `lotacao`, `modelo`, `numeroCilindro`, `numeroQuadro`, `peso`, `tara`, `tipoCaixa`, `numeroMatricula`) VALUES
(1, '225/45R17', '2000cc', 1, 'Gasolina', 'Preto', '2.5m', '5', 'Corolla', '4', 'QUADRO123', '1500kg', '1200kg', 'Manual', 'MAT12345'),
(2, '434554545', '4345t435', 1, 'gasolio', 'Vermelha', '43-54', '5', 'Rav-4', '44354', '5425424', '2455424452', '2454554', 'Feixada', 'LD-98-45-DF'),
(3, '323AD32', '595', 2, 'Electrico', 'Azul', '3443', '5', 'X70', '9', '5454/654343/43', '345', '200', 'Automático', 'LF-43-54-DE'),
(4, 'RRGEGR/o787', '4535665', 3, 'Gasoleo', 'Verde-água', '3455555564', '2', 'X70', '6', '5451515551', '344545', '654567657654', 'Automático', 'LF-43-54-HD');
