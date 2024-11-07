-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 06/11/2024 às 16:33
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `transito`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `alertaroubo`
--

CREATE TABLE `alertaroubo` (
  `codAlertaRoubo` int(11) NOT NULL,
  `codAutomobilista` int(11) NOT NULL,
  `codViatura` int(11) NOT NULL,
  `dataRoubo` date NOT NULL,
  `codTipoRoubo` int(11) NOT NULL,
  `descRoubo` text NOT NULL,
  `codEndereco` int(11) DEFAULT 0,
  `dataFeita` date NOT NULL DEFAULT current_timestamp(),
  `status` varchar(100) DEFAULT 'Ativo',
  `horaFeita` time NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `alertaroubo`
--

INSERT INTO `alertaroubo` (`codAlertaRoubo`, `codAutomobilista`, `codViatura`, `dataRoubo`, `codTipoRoubo`, `descRoubo`, `codEndereco`, `dataFeita`, `status`, `horaFeita`) VALUES
(1, 1, 1, '2023-05-01', 1, 'Detalhes do roubo', 1, '2024-10-31', 'Ativo', '12:09:52'),
(2, 1, 1, '2023-07-18', 1, 'Roubo sem violência', 1, '2024-10-31', 'Cancelado', '12:09:52'),
(3, 1, 2, '2024-10-17', 1, 'wqqdsqwedwdwdewdwedwdew', 2, '2024-10-31', 'Ativo', '14:00:53');

-- --------------------------------------------------------

--
-- Estrutura para tabela `automobilista`
--

CREATE TABLE `automobilista` (
  `codAutomobilista` int(11) NOT NULL,
  `codCartaConducao` int(11) NOT NULL,
  `codPessoa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `automobilista`
--

INSERT INTO `automobilista` (`codAutomobilista`, `codCartaConducao`, `codPessoa`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `bi`
--

CREATE TABLE `bi` (
  `idBi` int(11) NOT NULL,
  `dataEmicaoBi` date NOT NULL,
  `dataValidacaoBi` date NOT NULL,
  `numeroBI` varchar(18) NOT NULL,
  `codFicheiroBi` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `bi`
--

INSERT INTO `bi` (`idBi`, `dataEmicaoBi`, `dataValidacaoBi`, `numeroBI`, `codFicheiroBi`) VALUES
(1, '2019-01-01', '2029-01-01', 'BI12345678', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `cartaconducao`
--

CREATE TABLE `cartaconducao` (
  `codCartaConducao` int(11) NOT NULL,
  `dataEmissao` date NOT NULL,
  `dataValidade` date NOT NULL,
  `numeroVia` varchar(100) NOT NULL,
  `codCategoriaCarta` int(11) NOT NULL,
  `numeroCarta` int(11) NOT NULL,
  `dataPrimeiraEmissao` date NOT NULL,
  `localEmissao` int(11) NOT NULL,
  `codFicheiroCartaConducao` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `cartaconducao`
--

INSERT INTO `cartaconducao` (`codCartaConducao`, `dataEmissao`, `dataValidade`, `numeroVia`, `codCategoriaCarta`, `numeroCarta`, `dataPrimeiraEmissao`, `localEmissao`, `codFicheiroCartaConducao`) VALUES
(1, '2023-01-01', '2028-01-01', '1a Via', 1, 12345, '2023-01-01', 1, 2);

-- --------------------------------------------------------

--
-- Estrutura para tabela `categoriacarta`
--

CREATE TABLE `categoriacarta` (
  `codCategoriaCarta` int(11) NOT NULL,
  `descCategoriaCarta` varchar(200) NOT NULL,
  `sigla` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `categoriacarta`
--

INSERT INTO `categoriacarta` (`codCategoriaCarta`, `descCategoriaCarta`, `sigla`) VALUES
(1, 'Categoria B', 'B');

-- --------------------------------------------------------

--
-- Estrutura para tabela `contacto`
--

CREATE TABLE `contacto` (
  `idContacto` int(11) NOT NULL,
  `contacto1` varchar(15) NOT NULL,
  `contacto2` varchar(20) DEFAULT NULL,
  `email1` varchar(50) DEFAULT NULL,
  `email2` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `contacto`
--

INSERT INTO `contacto` (`idContacto`, `contacto1`, `contacto2`, `email1`, `email2`) VALUES
(1, '912345678', '923456789', 'email1@example.com', 'email2@example.com');

-- --------------------------------------------------------

--
-- Estrutura para tabela `endereco`
--

CREATE TABLE `endereco` (
  `idEndereco` int(11) NOT NULL,
  `idMunicipio` int(11) NOT NULL,
  `descricaoEndereco` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `endereco`
--

INSERT INTO `endereco` (`idEndereco`, `idMunicipio`, `descricaoEndereco`) VALUES
(1, 1, 'Rua A, Bairro B'),
(2, 1, 'refwgtwrgwrgrwgrwgtrw');

-- --------------------------------------------------------

--
-- Estrutura para tabela `ficheiro`
--

CREATE TABLE `ficheiro` (
  `idFicheiro` int(11) NOT NULL,
  `nomeFicheiro` varchar(250) NOT NULL,
  `dataEntrada` varchar(20) DEFAULT current_timestamp(),
  `dataValidacao` varchar(20) DEFAULT NULL,
  `estadoValidacao` enum('Pendente','Validado','Invalidado') DEFAULT 'Pendente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `ficheiro`
--

INSERT INTO `ficheiro` (`idFicheiro`, `nomeFicheiro`, `dataEntrada`, `dataValidacao`, `estadoValidacao`) VALUES
(1, 'Ficheiro1', '2023-01-01', '2024-01-01', 'Validado'),
(2, 'Ficheiro2', '2023-02-01', '2024-02-01', 'Pendente');

-- --------------------------------------------------------

--
-- Estrutura para tabela `funcionario`
--

CREATE TABLE `funcionario` (
  `codFuncionario` int(11) NOT NULL,
  `codPessoa` int(11) NOT NULL,
  `codficheiroFotoPerfil` int(11) NOT NULL,
  `codficheiroFotoPendente` int(11) DEFAULT NULL,
  `numeroAgente` varchar(50) DEFAULT NULL,
  `senha` int(11) NOT NULL DEFAULT 1234
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `funcionario`
--

INSERT INTO `funcionario` (`codFuncionario`, `codPessoa`, `codficheiroFotoPerfil`, `codficheiroFotoPendente`, `numeroAgente`, `senha`) VALUES
(1, 1, 1, NULL, 'AGT1122', 1234),
(2, 2, 1, NULL, 'AGT3344', 1234);

-- --------------------------------------------------------

--
-- Estrutura para tabela `infracao`
--

CREATE TABLE `infracao` (
  `codInfracao` int(11) NOT NULL,
  `codMulta` int(11) NOT NULL,
  `codTipoInfracao` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `infracao`
--

INSERT INTO `infracao` (`codInfracao`, `codMulta`, `codTipoInfracao`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 3, 3);

-- --------------------------------------------------------

--
-- Estrutura para tabela `livrete`
--

CREATE TABLE `livrete` (
  `codLivrete` int(11) NOT NULL,
  `codViatura` int(11) NOT NULL,
  `codServico` int(11) NOT NULL,
  `dataEmissao` date NOT NULL,
  `dataPrimeiroRegistro` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `livrete`
--

INSERT INTO `livrete` (`codLivrete`, `codViatura`, `codServico`, `dataEmissao`, `dataPrimeiroRegistro`) VALUES
(1, 1, 1, '2023-01-01', '2023-01-01');

-- --------------------------------------------------------

--
-- Estrutura para tabela `marca`
--

CREATE TABLE `marca` (
  `codMarca` int(11) NOT NULL,
  `descMarca` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `marca`
--

INSERT INTO `marca` (`codMarca`, `descMarca`) VALUES
(1, 'Toyota');

-- --------------------------------------------------------

--
-- Estrutura para tabela `multa`
--

CREATE TABLE `multa` (
  `codMulta` int(11) NOT NULL,
  `codAutomobilista` int(11) DEFAULT NULL,
  `CodViatura` int(11) DEFAULT NULL,
  `valorMulta` varchar(100) NOT NULL,
  `estadoMulta` enum('PAGO','NAO PAGO','PENDENTE') NOT NULL,
  `data` date NOT NULL DEFAULT current_timestamp(3),
  `descMulta` text NOT NULL DEFAULT '',
  `codFuncionario` int(11) DEFAULT NULL,
  `dataPagamento` datetime DEFAULT NULL,
  `dataLimite` datetime(3) NOT NULL DEFAULT (curdate() + interval 15 day),
  `horaFeita` time NOT NULL DEFAULT current_timestamp(),
  `statusTribunal` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `multa`
--

INSERT INTO `multa` (`codMulta`, `codAutomobilista`, `CodViatura`, `valorMulta`, `estadoMulta`, `data`, `descMulta`, `codFuncionario`, `dataPagamento`, `dataLimite`, `horaFeita`, `statusTribunal`) VALUES
(1, 1, 1, '10000', 'PENDENTE', '2024-11-06', '', 2, NULL, '2024-10-13 00:00:00.000', '12:09:52', 1),
(3, 1, NULL, '12100', 'PENDENTE', '2024-10-09', 'JHIVGuvhbekwbldewobvfrwhv', 2, '2024-10-31 13:16:59', '2024-11-15 00:00:00.000', '12:09:52', 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `municipio`
--

CREATE TABLE `municipio` (
  `idMunicipio` int(11) NOT NULL,
  `idProvincia` int(11) NOT NULL,
  `municipio` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `municipio`
--

INSERT INTO `municipio` (`idMunicipio`, `idProvincia`, `municipio`) VALUES
(1, 1, 'Cazenga');

-- --------------------------------------------------------

--
-- Estrutura para tabela `pagamentomulta`
--

CREATE TABLE `pagamentomulta` (
  `codPagamentoMulta` int(11) NOT NULL,
  `codMulta` int(11) NOT NULL,
  `valorPago` varchar(100) NOT NULL,
  `descCodigoDeposito` varchar(200) NOT NULL,
  `codFicheiroPagamento` int(11) DEFAULT NULL,
  `dataCriacao` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `referencia` varchar(191) NOT NULL DEFAULT '25436355',
  `status` varchar(100) NOT NULL DEFAULT 'Pendente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `pagamentomulta`
--

INSERT INTO `pagamentomulta` (`codPagamentoMulta`, `codMulta`, `valorPago`, `descCodigoDeposito`, `codFicheiroPagamento`, `dataCriacao`, `referencia`, `status`) VALUES
(1, 1, '10000', 'DEP123456', 1, '2023-04-25 00:00:00.000', '1234567890', 'Nao Pago'),
(2, 3, '8000', 'DEP654321', 1, '2023-05-30 00:00:00.000', '087654321', 'PAGO');

-- --------------------------------------------------------

--
-- Estrutura para tabela `pais`
--

CREATE TABLE `pais` (
  `idPais` int(11) NOT NULL,
  `pais` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `pais`
--

INSERT INTO `pais` (`idPais`, `pais`) VALUES
(4, 'Africa do Sul'),
(1, 'Angola'),
(2, 'Moçambique'),
(3, 'Namibia');

-- --------------------------------------------------------

--
-- Estrutura para tabela `pessoa`
--

CREATE TABLE `pessoa` (
  `codPessoa` int(11) NOT NULL,
  `codEndereco` int(11) DEFAULT NULL,
  `codNacionalidade` int(11) DEFAULT NULL,
  `codContacto` int(11) DEFAULT 0,
  `nome` varchar(150) NOT NULL,
  `genero` enum('Masculino','Feminino') NOT NULL,
  `estadoCivil` enum('Solteiro','Casado','Solteira','Casada') NOT NULL,
  `dataCadastro` varchar(20) DEFAULT current_timestamp(),
  `dataNascimento` varchar(20) NOT NULL,
  `codBi` int(11) NOT NULL,
  `senha` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `pessoa`
--

INSERT INTO `pessoa` (`codPessoa`, `codEndereco`, `codNacionalidade`, `codContacto`, `nome`, `genero`, `estadoCivil`, `dataCadastro`, `dataNascimento`, `codBi`, `senha`) VALUES
(1, 1, 1, 1, 'João Silva', 'Masculino', 'Casado', '2023-01-01', '1990-01-01', 1, 'senha123'),
(2, 1, 1, 1, 'Maria Santos', 'Feminino', 'Solteira', '2023-01-01', '1992-01-01', 1, 'senha456');

-- --------------------------------------------------------

--
-- Estrutura para tabela `provincia`
--

CREATE TABLE `provincia` (
  `idProvincia` int(11) NOT NULL,
  `provincia` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `provincia`
--

INSERT INTO `provincia` (`idProvincia`, `provincia`) VALUES
(1, 'Luanda'),
(2, 'Benguela'),
(3, 'Huambo'),
(4, 'Cabinda');

-- --------------------------------------------------------

--
-- Estrutura para tabela `reclamacao`
--

CREATE TABLE `reclamacao` (
  `codReclamacao` int(11) NOT NULL,
  `codMulta` int(11) NOT NULL,
  `dataReclamacao` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `motivo` varchar(255) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'Pendente',
  `observacao` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `reclamacao`
--

INSERT INTO `reclamacao` (`codReclamacao`, `codMulta`, `dataReclamacao`, `motivo`, `status`, `observacao`) VALUES
(1, 3, '2024-11-05 14:13:15.969', 'Ma interpretacao do agente', 'Negada', 'Eu estva jhdjskfs hfwnlf hwnflwe f loiwfwe'),
(2, 1, '2024-11-06 12:53:41.334', 'rgregregergrrgegr', 'Pendente', NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `serivicoviatura`
--

CREATE TABLE `serivicoviatura` (
  `codServicoViatura` int(11) NOT NULL,
  `descServico` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `serivicoviatura`
--

INSERT INTO `serivicoviatura` (`codServicoViatura`, `descServico`) VALUES
(1, 'Inspeção');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tipoinfracao`
--

CREATE TABLE `tipoinfracao` (
  `codTipoInfracao` int(11) NOT NULL,
  `descTipoInfracao` varchar(200) NOT NULL,
  `valorInfracao` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `tipoinfracao`
--

INSERT INTO `tipoinfracao` (`codTipoInfracao`, `descTipoInfracao`, `valorInfracao`) VALUES
(1, 'Excesso de Velocidade', '10000'),
(2, 'Parar em cima da passadeira', '2000'),
(3, 'Sem macaca', '2100');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tiporoubo`
--

CREATE TABLE `tiporoubo` (
  `codTipoRoubo` int(11) NOT NULL,
  `descTipoRoubo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `tiporoubo`
--

INSERT INTO `tiporoubo` (`codTipoRoubo`, `descTipoRoubo`) VALUES
(1, 'Assalto');

-- --------------------------------------------------------

--
-- Estrutura para tabela `titulopropriedade`
--

CREATE TABLE `titulopropriedade` (
  `codTituloPropriedade` int(11) NOT NULL,
  `codPessoa` int(11) NOT NULL,
  `dataEmissao` date NOT NULL,
  `dataPrimeiroRegistro` date NOT NULL,
  `numeroEmissao` varchar(100) NOT NULL,
  `codViatura` int(11) NOT NULL,
  `codFicheiroTituloPropriedade` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `titulopropriedade`
--

INSERT INTO `titulopropriedade` (`codTituloPropriedade`, `codPessoa`, `dataEmissao`, `dataPrimeiroRegistro`, `numeroEmissao`, `codViatura`, `codFicheiroTituloPropriedade`) VALUES
(1, 1, '2023-02-15', '2023-02-15', 'EMISSAO123', 1, 1),
(3, 1, '2024-10-12', '2024-10-01', '3', 2, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE `usuario` (
  `codUsuario` int(11) NOT NULL,
  `senha` varchar(191) NOT NULL,
  `bi` varchar(191) NOT NULL,
  `numeroAgente` varchar(191) NOT NULL,
  `telefone` varchar(191) NOT NULL,
  `codPessoa` int(11) NOT NULL,
  `tipoUsuario` enum('Transito','Automobilista','Admin') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `usuario`
--

INSERT INTO `usuario` (`codUsuario`, `senha`, `bi`, `numeroAgente`, `telefone`, `codPessoa`, `tipoUsuario`) VALUES
(1, '$2b$04$wXr8DGrF3lITTxeNCZBXSO5ms/QZzTVcSiGpKA1SMCYf1P5JRs/AG', 'BI98765432', 'AGT12345', '923456789', 2, 'Admin'),
(2, '$2b$04$wXr8DGrF3lITTxeNCZBXSO5ms/QZzTVcSiGpKA1SMCYf1P5JRs/AG', 'BI123456', '', '938125665', 1, 'Automobilista');

-- --------------------------------------------------------

--
-- Estrutura para tabela `viatura`
--

CREATE TABLE `viatura` (
  `codViatura` int(11) NOT NULL,
  `MedidasPneumaticos` varchar(100) NOT NULL,
  `cilindrada` varchar(100) NOT NULL,
  `codMarca` int(11) NOT NULL,
  `conbustivel` varchar(100) NOT NULL,
  `corViatura` varchar(100) NOT NULL,
  `distanciaEixo` varchar(100) NOT NULL,
  `lotacao` varchar(100) NOT NULL,
  `modelo` varchar(200) NOT NULL,
  `numeroCilindro` varchar(100) NOT NULL,
  `numeroQuadro` varchar(100) NOT NULL,
  `peso` varchar(100) NOT NULL,
  `tara` varchar(100) NOT NULL,
  `tipoCaixa` varchar(100) NOT NULL,
  `numeroMatricula` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `viatura`
--

INSERT INTO `viatura` (`codViatura`, `MedidasPneumaticos`, `cilindrada`, `codMarca`, `conbustivel`, `corViatura`, `distanciaEixo`, `lotacao`, `modelo`, `numeroCilindro`, `numeroQuadro`, `peso`, `tara`, `tipoCaixa`, `numeroMatricula`) VALUES
(1, '225/45R17', '2000cc', 1, 'Gasolina', 'Preto', '2.5m', '5', 'Corolla', '4', 'QUADRO123', '1500kg', '1200kg', 'Manual', 'MAT12345'),
(2, '434554545', '4345t435', 1, 'gasolio', 'Vermelha', '43-54', '5', 'Rav-4', '44354', '5425424', '2455424452', '2454554', 'Feixada', 'LD-98-45-DF');

-- --------------------------------------------------------

--
-- Estrutura para tabela `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('114b805b-94ef-4542-b23c-fe14cd4b0ff6', '3041fa581546672beb01a9d89fdb538261cc6e96560cd63ba58c11de0b934556', '2024-10-31 10:35:47.476', '20241010112503_valor_estado_multa', NULL, NULL, '2024-10-31 10:35:47.461', 1),
('1ae6f313-bbae-44d8-8a12-ec50be0ea1ae', 'd2c8bd600e6e1c135feabbc5d0c5571420bf2c6ad46bf4d0dca9f5150c6b2c3c', '2024-10-31 10:35:47.210', '20241009183705_add', NULL, NULL, '2024-10-31 10:35:47.195', 1),
('2dee7cae-eb10-40d8-b471-6c7f90d5c2eb', '6caad4fe51a7cb143f4abf67debabab7d6cc09fe5b48512b4e4cf482367b4693', '2024-10-31 10:35:46.975', '20240717134102_tabl', NULL, NULL, '2024-10-31 10:35:46.866', 1),
('3a26ad60-799f-4481-9a71-7701989ba860', 'b2fbcbd602c2aee092277a3c65ad9c467cc7d683e36349783025b0872ef1f7e3', '2024-10-31 10:35:47.678', '20241010214828_data_feita', NULL, NULL, '2024-10-31 10:35:47.666', 1),
('3f8a6d95-db99-4bcf-9665-c3522579b904', '9ed6fdf452591f6ecfea52965b14d274f18207d441c420438224e049ecc907f1', '2024-10-31 10:35:47.178', '20240718110243_tbl', NULL, NULL, '2024-10-31 10:35:47.138', 1),
('5c3ed0e7-8c1a-41f5-87f0-43f95bcd26c3', 'a431dc046662f3fc4217a7295b2bced18beee6644f5a350c3be6cb6938161839', '2024-10-31 10:35:47.566', '20241010211550_endereco_no_alertaroubo', NULL, NULL, '2024-10-31 10:35:47.478', 1),
('6913c6c8-72c2-4c75-a8d6-465e9c0267aa', 'a4c81fc2717a12d5fee17a68285066bb7790e3921f70760d6f59b2e6c4f0eeeb', '2024-10-31 10:35:54.878', '20241031103554_', NULL, NULL, '2024-10-31 10:35:54.694', 1),
('7ca72961-0264-492d-a3bf-d37e844855ab', '60c507f9b1c1a8b391375ada08890f7a33c176ca0ba86ce478b151055c3bc009', '2024-10-31 10:35:47.662', '20241010212823_', NULL, NULL, '2024-10-31 10:35:47.643', 1),
('874e1ff8-cb40-4aa1-9a2f-468f120b2d27', '51c4b2a9756281c6c8931e2f48850744d7c9a717e063da57bcd0750cd92a6f18', '2024-10-31 10:35:47.116', '20240717161622_tabl', NULL, NULL, '2024-10-31 10:35:47.012', 1),
('8bec49bd-36ad-4655-a3e8-d90fdba7cc3c', '00c33b27c9a26d23ee4bd339292e5cda33e5d177f0acfd133af6441a5f4a6ba3', '2024-10-31 10:35:47.460', '20241010094325_relacao_funcionario_e_multa', NULL, NULL, '2024-10-31 10:35:47.361', 1),
('9471555a-e10c-440f-aec9-bddd56e8e267', '8d9a66d3a480f20d5bb43a50c6a1ef6ac4c17c04c1ccb5d9b84b70c64a7763b5', '2024-10-31 10:35:47.010', '20240717134331_tabl', NULL, NULL, '2024-10-31 10:35:46.976', 1),
('9d6aef8c-e56d-4590-98c6-139314ee873f', 'f517978aaf8f84b1413d26b0b3d59cdcd025d9713b35a05c91e4b450308b2347', '2024-10-31 10:35:47.194', '20241009152150_add', NULL, NULL, '2024-10-31 10:35:47.180', 1),
('a31b4da1-6be0-435d-9385-38916c57c642', 'efef669dcbd9010f50db7a50e1d4b2c8f1fe19c431f891d4780225f2daeb1595', '2024-10-31 10:35:46.844', '20240712133908_transito', NULL, NULL, '2024-10-31 10:35:46.822', 1),
('b07a3b95-67e3-49b1-89ea-f1550064c2cb', 'cd1e9b5fc214f904bc35dbf90c5a1a425d9b7e21874d8609014f35ed2451150d', '2024-10-31 10:35:46.820', '20240711165022_generate_table', NULL, NULL, '2024-10-31 10:35:44.585', 1),
('b908feda-3123-4113-89bd-d09f64688c37', 'efef669dcbd9010f50db7a50e1d4b2c8f1fe19c431f891d4780225f2daeb1595', '2024-10-31 10:35:46.862', '20240717131604_transito', NULL, NULL, '2024-10-31 10:35:46.846', 1),
('b9164e59-1385-44fe-8f89-d206ebb2169c', 'd4f1b39037b196849b793614634ab4c3cf40a33984471876a85b915f6d22806b', '2024-10-31 10:35:47.301', '20241010075847_add_cod_funcionario_na_multa', NULL, NULL, '2024-10-31 10:35:47.212', 1),
('d44463fd-1f07-4585-9f6e-0a12fd3324db', 'ccd099711949be0cf1f7dc957e1f8e9aa4cb39625f52b5494595dd9effd32295', '2024-10-31 10:35:47.642', '20241010212059_nome', NULL, NULL, '2024-10-31 10:35:47.568', 1),
('db0173f3-eef6-4294-8b92-bd6a0a55c3a9', 'b9b6fd54327a21cce8a17393874560074bb7ce680c9259b90cf4592a20e23e6d', '2024-10-31 10:35:47.359', '20241010081755_cod_funcionario_add', NULL, NULL, '2024-10-31 10:35:47.303', 1),
('e25cb8f5-76a0-4695-a9ee-b699824a8cd7', '0900872db96970bb109c7724997156ad3a620b1d37830512c6071db17f4f9b09', '2024-10-31 10:35:47.842', '20241021085104_add_status_roubo', NULL, NULL, '2024-10-31 10:35:47.830', 1),
('e4824d58-f3de-4b15-954e-b3235a63810e', 'efef669dcbd9010f50db7a50e1d4b2c8f1fe19c431f891d4780225f2daeb1595', '2024-10-31 10:35:47.137', '20240718105342_tbl', NULL, NULL, '2024-10-31 10:35:47.118', 1),
('e618e358-a7f2-4d69-a504-5a7446899eee', '97a66184dc1e78e6dffd7a192d4a1e4a77aa9ee3afc507066fd028626fc2bad6', '2024-10-31 10:35:47.827', '20241017082740_novo_multa', NULL, NULL, '2024-10-31 10:35:47.681', 1);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `alertaroubo`
--
ALTER TABLE `alertaroubo`
  ADD PRIMARY KEY (`codAlertaRoubo`),
  ADD KEY `codAutomobilista` (`codAutomobilista`),
  ADD KEY `codTipoRoubo` (`codTipoRoubo`),
  ADD KEY `codViatura` (`codViatura`),
  ADD KEY `codEndereco` (`codEndereco`);

--
-- Índices de tabela `automobilista`
--
ALTER TABLE `automobilista`
  ADD PRIMARY KEY (`codAutomobilista`),
  ADD KEY `codCartaConducao` (`codCartaConducao`),
  ADD KEY `codPessoa` (`codPessoa`);

--
-- Índices de tabela `bi`
--
ALTER TABLE `bi`
  ADD PRIMARY KEY (`idBi`),
  ADD KEY `codFicheiroBi` (`codFicheiroBi`);

--
-- Índices de tabela `cartaconducao`
--
ALTER TABLE `cartaconducao`
  ADD PRIMARY KEY (`codCartaConducao`),
  ADD KEY `codCategoriaCarta` (`codCategoriaCarta`),
  ADD KEY `codFicheiroCartaConducao` (`codFicheiroCartaConducao`);

--
-- Índices de tabela `categoriacarta`
--
ALTER TABLE `categoriacarta`
  ADD PRIMARY KEY (`codCategoriaCarta`);

--
-- Índices de tabela `contacto`
--
ALTER TABLE `contacto`
  ADD PRIMARY KEY (`idContacto`),
  ADD UNIQUE KEY `email1` (`email1`),
  ADD UNIQUE KEY `email2` (`email2`);

--
-- Índices de tabela `endereco`
--
ALTER TABLE `endereco`
  ADD PRIMARY KEY (`idEndereco`),
  ADD KEY `idMunicipio` (`idMunicipio`);

--
-- Índices de tabela `ficheiro`
--
ALTER TABLE `ficheiro`
  ADD PRIMARY KEY (`idFicheiro`);

--
-- Índices de tabela `funcionario`
--
ALTER TABLE `funcionario`
  ADD PRIMARY KEY (`codFuncionario`),
  ADD UNIQUE KEY `numeroAgente` (`numeroAgente`),
  ADD KEY `idColaboradorPessoa` (`codPessoa`),
  ADD KEY `idficheiroFotoPendente` (`codficheiroFotoPendente`),
  ADD KEY `idficheiroFotoPerfil` (`codficheiroFotoPerfil`);

--
-- Índices de tabela `infracao`
--
ALTER TABLE `infracao`
  ADD PRIMARY KEY (`codInfracao`),
  ADD KEY `codMulta` (`codMulta`),
  ADD KEY `codTipoInfracao` (`codTipoInfracao`);

--
-- Índices de tabela `livrete`
--
ALTER TABLE `livrete`
  ADD PRIMARY KEY (`codLivrete`),
  ADD KEY `codServico` (`codServico`),
  ADD KEY `codViatura` (`codViatura`);

--
-- Índices de tabela `marca`
--
ALTER TABLE `marca`
  ADD PRIMARY KEY (`codMarca`);

--
-- Índices de tabela `multa`
--
ALTER TABLE `multa`
  ADD PRIMARY KEY (`codMulta`),
  ADD KEY `CodViatura` (`CodViatura`),
  ADD KEY `codAutomobilista` (`codAutomobilista`),
  ADD KEY `idx_cod_funcionario` (`codFuncionario`);

--
-- Índices de tabela `municipio`
--
ALTER TABLE `municipio`
  ADD PRIMARY KEY (`idMunicipio`),
  ADD KEY `idProvincia` (`idProvincia`);

--
-- Índices de tabela `pagamentomulta`
--
ALTER TABLE `pagamentomulta`
  ADD PRIMARY KEY (`codPagamentoMulta`),
  ADD UNIQUE KEY `pagamentomulta_referencia_key` (`referencia`),
  ADD KEY `codFicheiroPagamento` (`codFicheiroPagamento`),
  ADD KEY `codMulta` (`codMulta`);

--
-- Índices de tabela `pais`
--
ALTER TABLE `pais`
  ADD PRIMARY KEY (`idPais`),
  ADD UNIQUE KEY `pais` (`pais`);

--
-- Índices de tabela `pessoa`
--
ALTER TABLE `pessoa`
  ADD PRIMARY KEY (`codPessoa`),
  ADD KEY `Representa onde a pessoa nasceu` (`codNacionalidade`),
  ADD KEY `Representa onde a pessoa vive` (`codEndereco`),
  ADD KEY `codBi` (`codBi`),
  ADD KEY `codContacto` (`codContacto`);

--
-- Índices de tabela `provincia`
--
ALTER TABLE `provincia`
  ADD PRIMARY KEY (`idProvincia`);

--
-- Índices de tabela `reclamacao`
--
ALTER TABLE `reclamacao`
  ADD PRIMARY KEY (`codReclamacao`),
  ADD KEY `idx_cod_multa` (`codMulta`);

--
-- Índices de tabela `serivicoviatura`
--
ALTER TABLE `serivicoviatura`
  ADD PRIMARY KEY (`codServicoViatura`);

--
-- Índices de tabela `tipoinfracao`
--
ALTER TABLE `tipoinfracao`
  ADD PRIMARY KEY (`codTipoInfracao`);

--
-- Índices de tabela `tiporoubo`
--
ALTER TABLE `tiporoubo`
  ADD PRIMARY KEY (`codTipoRoubo`);

--
-- Índices de tabela `titulopropriedade`
--
ALTER TABLE `titulopropriedade`
  ADD PRIMARY KEY (`codTituloPropriedade`),
  ADD KEY `codFicheiroTituloPropriedade` (`codFicheiroTituloPropriedade`),
  ADD KEY `codPessoa` (`codPessoa`),
  ADD KEY `codViatura` (`codViatura`);

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`codUsuario`),
  ADD UNIQUE KEY `usuario_bi_key` (`bi`),
  ADD UNIQUE KEY `usuario_numeroAgente_key` (`numeroAgente`),
  ADD UNIQUE KEY `usuario_telefone_key` (`telefone`),
  ADD KEY `codPessoa` (`codPessoa`);

--
-- Índices de tabela `viatura`
--
ALTER TABLE `viatura`
  ADD PRIMARY KEY (`codViatura`),
  ADD KEY `codMarca` (`codMarca`);

--
-- Índices de tabela `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `alertaroubo`
--
ALTER TABLE `alertaroubo`
  MODIFY `codAlertaRoubo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `automobilista`
--
ALTER TABLE `automobilista`
  MODIFY `codAutomobilista` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `bi`
--
ALTER TABLE `bi`
  MODIFY `idBi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `cartaconducao`
--
ALTER TABLE `cartaconducao`
  MODIFY `codCartaConducao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `categoriacarta`
--
ALTER TABLE `categoriacarta`
  MODIFY `codCategoriaCarta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `contacto`
--
ALTER TABLE `contacto`
  MODIFY `idContacto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `endereco`
--
ALTER TABLE `endereco`
  MODIFY `idEndereco` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `ficheiro`
--
ALTER TABLE `ficheiro`
  MODIFY `idFicheiro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `funcionario`
--
ALTER TABLE `funcionario`
  MODIFY `codFuncionario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `infracao`
--
ALTER TABLE `infracao`
  MODIFY `codInfracao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `livrete`
--
ALTER TABLE `livrete`
  MODIFY `codLivrete` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `marca`
--
ALTER TABLE `marca`
  MODIFY `codMarca` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `multa`
--
ALTER TABLE `multa`
  MODIFY `codMulta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `municipio`
--
ALTER TABLE `municipio`
  MODIFY `idMunicipio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `pagamentomulta`
--
ALTER TABLE `pagamentomulta`
  MODIFY `codPagamentoMulta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `pais`
--
ALTER TABLE `pais`
  MODIFY `idPais` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `pessoa`
--
ALTER TABLE `pessoa`
  MODIFY `codPessoa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `provincia`
--
ALTER TABLE `provincia`
  MODIFY `idProvincia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `reclamacao`
--
ALTER TABLE `reclamacao`
  MODIFY `codReclamacao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `serivicoviatura`
--
ALTER TABLE `serivicoviatura`
  MODIFY `codServicoViatura` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `tipoinfracao`
--
ALTER TABLE `tipoinfracao`
  MODIFY `codTipoInfracao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `tiporoubo`
--
ALTER TABLE `tiporoubo`
  MODIFY `codTipoRoubo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `titulopropriedade`
--
ALTER TABLE `titulopropriedade`
  MODIFY `codTituloPropriedade` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `codUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `viatura`
--
ALTER TABLE `viatura`
  MODIFY `codViatura` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `alertaroubo`
--
ALTER TABLE `alertaroubo`
  ADD CONSTRAINT `alertaroubo_ibfk_1` FOREIGN KEY (`codAutomobilista`) REFERENCES `automobilista` (`codAutomobilista`),
  ADD CONSTRAINT `alertaroubo_ibfk_2` FOREIGN KEY (`codTipoRoubo`) REFERENCES `tiporoubo` (`codTipoRoubo`),
  ADD CONSTRAINT `alertaroubo_ibfk_3` FOREIGN KEY (`codViatura`) REFERENCES `viatura` (`codViatura`),
  ADD CONSTRAINT `alertaroubo_ibfk_4` FOREIGN KEY (`codEndereco`) REFERENCES `endereco` (`idEndereco`) ON DELETE SET NULL;

--
-- Restrições para tabelas `automobilista`
--
ALTER TABLE `automobilista`
  ADD CONSTRAINT `automobilista_ibfk_1` FOREIGN KEY (`codCartaConducao`) REFERENCES `cartaconducao` (`codCartaConducao`),
  ADD CONSTRAINT `automobilista_ibfk_2` FOREIGN KEY (`codPessoa`) REFERENCES `pessoa` (`codPessoa`);

--
-- Restrições para tabelas `bi`
--
ALTER TABLE `bi`
  ADD CONSTRAINT `bi_ibfk_1` FOREIGN KEY (`codFicheiroBi`) REFERENCES `ficheiro` (`idFicheiro`);

--
-- Restrições para tabelas `cartaconducao`
--
ALTER TABLE `cartaconducao`
  ADD CONSTRAINT `cartaconducao_ibfk_1` FOREIGN KEY (`codCategoriaCarta`) REFERENCES `categoriacarta` (`codCategoriaCarta`),
  ADD CONSTRAINT `cartaconducao_ibfk_2` FOREIGN KEY (`codFicheiroCartaConducao`) REFERENCES `ficheiro` (`idFicheiro`);

--
-- Restrições para tabelas `endereco`
--
ALTER TABLE `endereco`
  ADD CONSTRAINT `endereco_ibfk_1` FOREIGN KEY (`idMunicipio`) REFERENCES `municipio` (`idMunicipio`);

--
-- Restrições para tabelas `funcionario`
--
ALTER TABLE `funcionario`
  ADD CONSTRAINT `funcionario_ibfk_1` FOREIGN KEY (`codficheiroFotoPerfil`) REFERENCES `ficheiro` (`idFicheiro`),
  ADD CONSTRAINT `funcionario_ibfk_2` FOREIGN KEY (`codPessoa`) REFERENCES `pessoa` (`codPessoa`);

--
-- Restrições para tabelas `livrete`
--
ALTER TABLE `livrete`
  ADD CONSTRAINT `livrete_ibfk_2` FOREIGN KEY (`codViatura`) REFERENCES `viatura` (`codViatura`),
  ADD CONSTRAINT `livrete_ibfk_3` FOREIGN KEY (`codServico`) REFERENCES `serivicoviatura` (`codServicoViatura`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
