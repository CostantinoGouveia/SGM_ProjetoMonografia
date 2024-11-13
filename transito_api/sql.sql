INSERT INTO `pais` (`idPais`, `pais`) VALUES
(1, 'Angola'), (2, 'Moçambique'), (3, 'Namibia'), (4, 'Africa do Sul');

INSERT INTO `provincia` (`idProvincia`, `provincia`) VALUES
(1, 'Luanda'), (2, 'Benguela'), (3, 'Huambo'), (4, 'Cabinda');

INSERT INTO `municipio` (`idMunicipio`, `idProvincia`, `municipio`) VALUES
(1, 1, 'Cazenga');

INSERT INTO `contacto` (`idContacto`, `contacto1`, `contacto2`, `email1`, `email2`) VALUES
(1, '912345678', '923456789', 'email1@example.com', 'email2@example.com');

INSERT INTO `ficheiro` (`idFicheiro`, `nomeFicheiro`, `dataEntrada`, `dataValidacao`, `estadoValidacao`) VALUES
(1, 'Ficheiro1', '2023-01-01', '2024-01-01', 'Validado'), 
(2, 'Ficheiro2', '2023-02-01', '2024-02-01', 'Pendente');

INSERT INTO `marca` (`codMarca`, `descMarca`) VALUES
(1, 'Toyota');

INSERT INTO `categoriacarta` (`codCategoriaCarta`, `descCategoriaCarta`, `sigla`) VALUES
(1, 'Categoria B', 'B');

INSERT INTO `tipoinfracao` (`codTipoInfracao`, `descTipoInfracao`, `valorInfracao`) VALUES
(1, 'Excesso de Velocidade', '10000'), 
(2, 'Parar em cima da passadeira', '2000'), 
(3, 'Sem macaca', '2100');

INSERT INTO `tiporoubo` (`codTipoRoubo`, `descTipoRoubo`) VALUES
(1, 'Assalto');

INSERT INTO `serivicoviatura` (`codServicoViatura`, `descServico`) VALUES
(1, 'Inspeção');



INSERT INTO `endereco` (`idEndereco`, `idMunicipio`, `descricaoEndereco`) VALUES
(1, 1, 'Rua A, Bairro B'), 
(2, 1, 'refwgtwrgwrgrwgrwgtrw');

INSERT INTO `bi` (`idBi`, `dataEmicaoBi`, `dataValidacaoBi`, `numeroBI`, `codFicheiroBi`) VALUES
(1, '2019-01-01', '2029-01-01', 'BI12345678', 1);

INSERT INTO `pessoa` (`codPessoa`, `codEndereco`, `codNacionalidade`, `codContacto`, `nome`, `genero`, `estadoCivil`, `dataCadastro`, `dataNascimento`, `codBi`, `senha`) VALUES
(1, 1, 1, 1, 'João Silva', 'Masculino', 'Casado', '2023-01-01', '1990-01-01', 1, 'senha123'),
(2, 1, 1, 1, 'Maria Santos', 'Feminino', 'Solteira', '2023-01-01', '1992-01-01', 1, 'senha456');

INSERT INTO `cartaconducao` (`codCartaConducao`, `dataEmissao`, `dataValidade`, `numeroVia`, `codCategoriaCarta`, `numeroCarta`, `dataPrimeiraEmissao`, `localEmissao`, `codFicheiroCartaConducao`) VALUES
(1, '2023-01-01', '2028-01-01', '1a Via', 1, 12345, '2023-01-01', 1, 2);

INSERT INTO `automobilista` (`codAutomobilista`, `codCartaConducao`, `codPessoa`) VALUES
(1, 1, 1);

INSERT INTO `funcionario` (`codFuncionario`, `codPessoa`, `codficheiroFotoPerfil`, `codficheiroFotoPendente`, `numeroAgente`, `senha`) VALUES
(1, 1, 1, NULL, 'AGT1122', 1234), 
(2, 2, 1, NULL, 'AGT3344', 1234);

INSERT INTO `usuario` (`codUsuario`, `senha`, `bi`, `numeroAgente`, `telefone`, `codPessoa`, `tipoUsuario`) VALUES
(1, '$2b$04$wXr8DGrF3lITTxeNCZBXSO5ms/QZzTVcSiGpKA1SMCYf1P5JRs/AG', 'BI98765432', 'AGT12345', '923456789', 2, 'Admin'), 
(2, '$2b$04$wXr8DGrF3lITTxeNCZBXSO5ms/QZzTVcSiGpKA1SMCYf1P5JRs/AG', 'BI123456', '', '938125665', 1, 'Automobilista');


INSERT INTO `viatura` (`codViatura`, `MedidasPneumaticos`, `cilindrada`, `codMarca`, `conbustivel`, `corViatura`, `distanciaEixo`, `lotacao`, `modelo`, `numeroCilindro`, `numeroQuadro`, `peso`, `tara`, `tipoCaixa`, `numeroMatricula`) VALUES
(1, '225/45R17', '2000cc', 1, 'Gasolina', 'Preto', '2.5m', '5', 'Corolla', '4', 'QUADRO123', '1500kg', '1200kg', 'Manual', 'MAT12345'),
(2, '434554545', '4345t435', 1, 'gasolio', 'Vermelha', '43-54', '5', 'Rav-4', '44354', '5425424', '2455424452', '2454554', 'Feixada', 'LD-98-45-DF');


INSERT INTO `livrete` (`codLivrete`, `codViatura`, `codServico`, `dataEmissao`, `dataPrimeiroRegistro`) VALUES
(1, 1, 1, '2023-01-01', '2023-01-01');

INSERT INTO `titulopropriedade` (`codTituloPropriedade`, `codPessoa`, `dataEmissao`, `dataPrimeiroRegistro`, `numeroEmissao`, `codViatura`, `codFicheiroTituloPropriedade`) VALUES
(1, 1, '2023-02-15', '2023-02-15', 'EMISSAO123', 1, 1),
(3, 1, '2024-10-12', '2024-10-01', '3', 2, 1);

INSERT INTO `multa` (`codMulta`, `codAutomobilista`, `CodViatura`, `valorMulta`, `estadoMulta`, `data`, `descMulta`, `codFuncionario`, `dataPagamento`, `dataLimite`, `horaFeita`, `statusTribunal`) VALUES
(1, 1, 1, '10000', 'PENDENTE', '2024-11-06', '', 2, NULL, '2024-10-13 00:00:00.000', '12:09:52', 1), 
(3, 1, NULL, '12100', 'PENDENTE', '2024-10-09', 'JHIVGuvhbekwbldewobvfrwhv', 2, '2024-10-31 13:16:59', '2024-11-15 00:00:00.000', '12:09:52', 0);


INSERT INTO `infracao` (`codInfracao`, `codMulta`, `codTipoInfracao`) VALUES
(1, 1, 1), 
(3, 3, 1), 
(4, 3, 3);

INSERT INTO `pagamentomulta` (`codPagamentoMulta`, `codMulta`, `valorPago`, `descCodigoDeposito`, `codFicheiroPagamento`, `dataCriacao`, `referencia`, `status`) VALUES
(1, 1, '10000', 'DEP123456', 1, '2023-04-25 00:00:00.000', '1234567890', 'Nao Pago'), 
(2, 3, '8000', 'DEP654321', 1, '2023-05-30 00:00:00.000', '087654321', 'PAGO');

INSERT INTO `alertaroubo` (`codAlertaRoubo`, `codAutomobilista`, `codViatura`, `dataRoubo`, `codTipoRoubo`, `descRoubo`, `codEndereco`, `dataFeita`, `status`, `horaFeita`) VALUES
(1, 1, 1, '2023-05-01', 1, 'Detalhes do roubo', 1, '2024-10-31', 'Ativo', '12:09:52'), 
(3, 1, 2, '2024-10-17', 1, 'wqqdsqwedwdwdewdwedwdew', 1, '2024-10-17', 'Inativo', '12:09:52');

INSERT INTO `reclamacao`(`codMulta`, `dataReclamacao`, `motivo`, `status`, `observacao`) VALUES 
(1, '2024-11-06','Reclamação teste','Pendente', '') 
