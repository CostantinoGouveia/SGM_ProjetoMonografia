-- CreateTable
CREATE TABLE `usuario` (
    `codUsuario` INTEGER NOT NULL AUTO_INCREMENT,
    `senha` VARCHAR(191) NOT NULL,
    `bi` VARCHAR(191) NOT NULL,
    `numeroAgente` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `codPessoa` INTEGER NOT NULL,
    `tipoUsuario` ENUM('Transito', 'Automobilista', 'Admin') NOT NULL,

    UNIQUE INDEX `usuario_bi_key`(`bi`),
    UNIQUE INDEX `usuario_numeroAgente_key`(`numeroAgente`),
    UNIQUE INDEX `usuario_telefone_key`(`telefone`),
    INDEX `codPessoa`(`codPessoa`),
    PRIMARY KEY (`codUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `alertaroubo` (
    `codAlertaRoubo` INTEGER NOT NULL AUTO_INCREMENT,
    `codAutomobilista` INTEGER NOT NULL,
    `codEndereco` INTEGER NULL DEFAULT 0,
    `codViatura` INTEGER NOT NULL,
    `status` VARCHAR(100) NULL DEFAULT 'Ativo',
    `dataRoubo` DATE NOT NULL,
    `dataFeita` DATE NOT NULL DEFAULT (current_timestamp()),
    `horaFeita` TIME NOT NULL DEFAULT (current_timestamp()),
    `codTipoRoubo` INTEGER NOT NULL,
    `descRoubo` TEXT NOT NULL,

    INDEX `codAutomobilista`(`codAutomobilista`),
    INDEX `codTipoRoubo`(`codTipoRoubo`),
    INDEX `codViatura`(`codViatura`),
    INDEX `codEndereco`(`codEndereco`),
    PRIMARY KEY (`codAlertaRoubo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `automobilista` (
    `codAutomobilista` INTEGER NOT NULL AUTO_INCREMENT,
    `codCartaConducao` INTEGER NOT NULL,
    `codPessoa` INTEGER NOT NULL,

    INDEX `codCartaConducao`(`codCartaConducao`),
    INDEX `codPessoa`(`codPessoa`),
    PRIMARY KEY (`codAutomobilista`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bi` (
    `idBi` INTEGER NOT NULL AUTO_INCREMENT,
    `dataEmicaoBi` DATE NOT NULL,
    `dataValidacaoBi` DATE NOT NULL,
    `numeroBI` VARCHAR(18) NOT NULL,
    `codFicheiroBi` INTEGER NOT NULL,

    INDEX `codFicheiroBi`(`codFicheiroBi`),
    PRIMARY KEY (`idBi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cartaconducao` (
    `codCartaConducao` INTEGER NOT NULL AUTO_INCREMENT,
    `dataEmissao` DATE NULL,
    `dataValidade` DATE NULL,
    `numeroVia` VARCHAR(100) NOT NULL,
    `codCategoriaCarta` INTEGER NOT NULL,
    `numeroCarta` INTEGER NOT NULL,
    `dataPrimeiraEmissao` DATE NULL,
    `localEmissao` INTEGER NOT NULL,
    `codFicheiroCartaConducao` INTEGER NOT NULL,

    INDEX `codCategoriaCarta`(`codCategoriaCarta`),
    INDEX `codFicheiroCartaConducao`(`codFicheiroCartaConducao`),
    PRIMARY KEY (`codCartaConducao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoriacarta` (
    `codCategoriaCarta` INTEGER NOT NULL AUTO_INCREMENT,
    `descCategoriaCarta` VARCHAR(200) NOT NULL,
    `sigla` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`codCategoriaCarta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contacto` (
    `idContacto` INTEGER NOT NULL AUTO_INCREMENT,
    `contacto1` VARCHAR(15) NOT NULL,
    `contacto2` VARCHAR(20) NULL,
    `email1` VARCHAR(50) NULL,
    `email2` VARCHAR(50) NULL,

    UNIQUE INDEX `email1`(`email1`),
    UNIQUE INDEX `email2`(`email2`),
    PRIMARY KEY (`idContacto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `endereco` (
    `idEndereco` INTEGER NOT NULL AUTO_INCREMENT,
    `idMunicipio` INTEGER NOT NULL,
    `descricaoEndereco` VARCHAR(50) NOT NULL,

    INDEX `idMunicipio`(`idMunicipio`),
    PRIMARY KEY (`idEndereco`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ficheiro` (
    `idFicheiro` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeFicheiro` VARCHAR(250) NOT NULL,
    `dataEntrada` VARCHAR(20) NULL,
    `dataValidacao` VARCHAR(20) NULL,
    `estadoValidacao` ENUM('Pendente', 'Validado', 'Invalidado') NULL DEFAULT 'Pendente',

    PRIMARY KEY (`idFicheiro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `funcionario` (
    `codFuncionario` INTEGER NOT NULL AUTO_INCREMENT,
    `codPessoa` INTEGER NOT NULL,
    `codficheiroFotoPerfil` INTEGER NOT NULL,
    `codficheiroFotoPendente` INTEGER NULL,
    `numeroAgente` VARCHAR(50) NULL,
    `senha` INTEGER NOT NULL DEFAULT 1234,

    UNIQUE INDEX `numeroAgente`(`numeroAgente`),
    INDEX `idColaboradorPessoa`(`codPessoa`),
    INDEX `idficheiroFotoPendente`(`codficheiroFotoPendente`),
    INDEX `idficheiroFotoPerfil`(`codficheiroFotoPerfil`),
    PRIMARY KEY (`codFuncionario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `infracao` (
    `codInfracao` INTEGER NOT NULL AUTO_INCREMENT,
    `codMulta` INTEGER NOT NULL,
    `codTipoInfracao` INTEGER NOT NULL,

    INDEX `codMulta`(`codMulta`),
    INDEX `codTipoInfracao`(`codTipoInfracao`),
    PRIMARY KEY (`codInfracao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `viatura` (
    `codViatura` INTEGER NOT NULL AUTO_INCREMENT,
    `MedidasPneumaticos` VARCHAR(100) NOT NULL,
    `cilindrada` VARCHAR(100) NOT NULL,
    `codMarca` INTEGER NOT NULL,
    `conbustivel` VARCHAR(100) NOT NULL,
    `corViatura` VARCHAR(100) NOT NULL,
    `distanciaEixo` VARCHAR(100) NOT NULL,
    `lotacao` VARCHAR(100) NOT NULL,
    `modelo` VARCHAR(200) NOT NULL,
    `numeroCilindro` VARCHAR(100) NOT NULL,
    `numeroQuadro` VARCHAR(100) NOT NULL,
    `peso` VARCHAR(100) NOT NULL,
    `tara` VARCHAR(100) NOT NULL,
    `tipoCaixa` VARCHAR(100) NOT NULL,
    `numeroMatricula` VARCHAR(50) NOT NULL,

    INDEX `codMarca`(`codMarca`),
    PRIMARY KEY (`codViatura`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `marca` (
    `codMarca` INTEGER NOT NULL AUTO_INCREMENT,
    `descMarca` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`codMarca`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `multa` (
    `codMulta` INTEGER NOT NULL AUTO_INCREMENT,
    `codAutomobilista` INTEGER NULL,
    `CodViatura` INTEGER NULL,
    `valorMulta` VARCHAR(100) NOT NULL,
    `estadoMulta` ENUM('PAGO', 'NAO PAGO', 'PENDENTE') NOT NULL,
    `data` DATE NULL,
    `dataPagamento` DATETIME NULL,
    `horaFeita` TIME NOT NULL DEFAULT (current_timestamp()),
    `descMulta` TEXT NULL,
    `codFuncionario` INTEGER NULL,
    `dataLimite` DATETIME(3)  NULL DEFAULT (current_date + interval 15 day),
    `statusTribunal` BOOLEAN  NULL DEFAULT false,

    INDEX `CodViatura`(`CodViatura`),
    INDEX `codAutomobilista`(`codAutomobilista`),
    INDEX `idx_cod_funcionario`(`codFuncionario`),
    PRIMARY KEY (`codMulta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reclamacao` (
    `codReclamacao` INTEGER NOT NULL AUTO_INCREMENT,
    `codMulta` INTEGER NOT NULL,
    `dataReclamacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `motivo` VARCHAR(255) NOT NULL,
    `status` VARCHAR(50) NOT NULL DEFAULT 'Pendente',
    `observacao` TEXT NULL,

    INDEX `idx_cod_multa`(`codMulta`),
    PRIMARY KEY (`codReclamacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `municipio` (
    `idMunicipio` INTEGER NOT NULL AUTO_INCREMENT,
    `idProvincia` INTEGER NOT NULL,
    `municipio` VARCHAR(50) NOT NULL,

    INDEX `idProvincia`(`idProvincia`),
    PRIMARY KEY (`idMunicipio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pagamentomulta` (
    `codPagamentoMulta` INTEGER NOT NULL AUTO_INCREMENT,
    `codMulta` INTEGER NOT NULL,
    `dataCriacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `referencia` VARCHAR(191) NOT NULL DEFAULT '25436355',
    `status` VARCHAR(100) NOT NULL DEFAULT 'Pendente',
    `valorPago` VARCHAR(100) NOT NULL,
    `descCodigoDeposito` VARCHAR(200) NOT NULL,
    `codFicheiroPagamento` INTEGER NULL,

    UNIQUE INDEX `pagamentomulta_referencia_key`(`referencia`),
    INDEX `codFicheiroPagamento`(`codFicheiroPagamento`),
    INDEX `codMulta`(`codMulta`),
    PRIMARY KEY (`codPagamentoMulta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pais` (
    `idPais` INTEGER NOT NULL AUTO_INCREMENT,
    `pais` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `pais`(`pais`),
    PRIMARY KEY (`idPais`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pessoa` (
    `codPessoa` INTEGER NOT NULL AUTO_INCREMENT,
    `codEndereco` INTEGER NULL,
    `codNacionalidade` INTEGER NULL,
    `codContacto` INTEGER NULL DEFAULT 0,
    `nome` VARCHAR(150) NOT NULL,
    `genero` ENUM('Masculino', 'Feminino') NOT NULL,
    `estadoCivil` ENUM('Solteiro', 'Casado', 'Solteira', 'Casada') NOT NULL,
    `dataCadastro` DATETIME NULL DEFAULT (current_timestamp()),
    `dataNascimento` DATE NOT NULL,
    `codBi` INTEGER NOT NULL,
    `senha` VARCHAR(100) NOT NULL,

    INDEX `Representa onde a pessoa nasceu`(`codNacionalidade`),
    INDEX `Representa onde a pessoa vive`(`codEndereco`),
    INDEX `codBi`(`codBi`),
    INDEX `codContacto`(`codContacto`),
    PRIMARY KEY (`codPessoa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `provincia` (
    `idProvincia` INTEGER NOT NULL AUTO_INCREMENT,
    `provincia` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`idProvincia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `serivicoviatura` (
    `codServicoViatura` INTEGER NOT NULL AUTO_INCREMENT,
    `descServico` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`codServicoViatura`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipoinfracao` (
    `codTipoInfracao` INTEGER NOT NULL AUTO_INCREMENT,
    `descTipoInfracao` VARCHAR(200) NOT NULL,
    `valorInfracao` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`codTipoInfracao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tiporoubo` (
    `codTipoRoubo` INTEGER NOT NULL AUTO_INCREMENT,
    `descTipoRoubo` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`codTipoRoubo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `titulopropriedade` (
    `codTituloPropriedade` INTEGER NOT NULL AUTO_INCREMENT,
    `codPessoa` INTEGER NOT NULL,
    `dataEmissao` DATE NOT NULL,
    `dataPrimeiroRegistro` DATE NOT NULL,
    `numeroEmissao` VARCHAR(100) NOT NULL,
    `codViatura` INTEGER NOT NULL,
    `codFicheiroTituloPropriedade` INTEGER NOT NULL,

    INDEX `codFicheiroTituloPropriedade`(`codFicheiroTituloPropriedade`),
    INDEX `codPessoa`(`codPessoa`),
    INDEX `codViatura`(`codViatura`),
    PRIMARY KEY (`codTituloPropriedade`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `livrete` (
    `codLivrete` INTEGER NOT NULL AUTO_INCREMENT,
    `codViatura` INTEGER NOT NULL,
    `codServico` INTEGER NOT NULL,
    `dataEmissao` DATE NOT NULL,
    `dataPrimeiroRegistro` DATE NOT NULL,

    INDEX `codServico`(`codServico`),
    INDEX `codViatura`(`codViatura`),
    PRIMARY KEY (`codLivrete`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`codPessoa`) REFERENCES `pessoa`(`codPessoa`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `alertaroubo` ADD CONSTRAINT `alertaroubo_ibfk_4` FOREIGN KEY (`codEndereco`) REFERENCES `endereco`(`idEndereco`) ON DELETE SET NULL ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `alertaroubo` ADD CONSTRAINT `alertaroubo_ibfk_1` FOREIGN KEY (`codAutomobilista`) REFERENCES `automobilista`(`codAutomobilista`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `alertaroubo` ADD CONSTRAINT `alertaroubo_ibfk_2` FOREIGN KEY (`codTipoRoubo`) REFERENCES `tiporoubo`(`codTipoRoubo`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `alertaroubo` ADD CONSTRAINT `alertaroubo_ibfk_3` FOREIGN KEY (`codViatura`) REFERENCES `viatura`(`codViatura`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `automobilista` ADD CONSTRAINT `automobilista_ibfk_1` FOREIGN KEY (`codCartaConducao`) REFERENCES `cartaconducao`(`codCartaConducao`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `automobilista` ADD CONSTRAINT `automobilista_ibfk_2` FOREIGN KEY (`codPessoa`) REFERENCES `pessoa`(`codPessoa`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `bi` ADD CONSTRAINT `bi_ibfk_1` FOREIGN KEY (`codFicheiroBi`) REFERENCES `ficheiro`(`idFicheiro`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `cartaconducao` ADD CONSTRAINT `cartaconducao_ibfk_1` FOREIGN KEY (`codCategoriaCarta`) REFERENCES `categoriacarta`(`codCategoriaCarta`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `cartaconducao` ADD CONSTRAINT `cartaconducao_ibfk_2` FOREIGN KEY (`codFicheiroCartaConducao`) REFERENCES `ficheiro`(`idFicheiro`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `endereco` ADD CONSTRAINT `endereco_ibfk_1` FOREIGN KEY (`idMunicipio`) REFERENCES `municipio`(`idMunicipio`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `funcionario` ADD CONSTRAINT `funcionario_ibfk_1` FOREIGN KEY (`codficheiroFotoPerfil`) REFERENCES `ficheiro`(`idFicheiro`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `funcionario` ADD CONSTRAINT `funcionario_ibfk_2` FOREIGN KEY (`codPessoa`) REFERENCES `pessoa`(`codPessoa`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `infracao` ADD CONSTRAINT `infracao_ibfk_1` FOREIGN KEY (`codMulta`) REFERENCES `multa`(`codMulta`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `infracao` ADD CONSTRAINT `infracao_ibfk_2` FOREIGN KEY (`codTipoInfracao`) REFERENCES `tipoinfracao`(`codTipoInfracao`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `viatura` ADD CONSTRAINT `livrete_ibfk_1` FOREIGN KEY (`codMarca`) REFERENCES `marca`(`codMarca`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `multa` ADD CONSTRAINT `multa_ibfk_1` FOREIGN KEY (`codAutomobilista`) REFERENCES `automobilista`(`codAutomobilista`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `multa` ADD CONSTRAINT `multa_ibfk_3` FOREIGN KEY (`CodViatura`) REFERENCES `viatura`(`codViatura`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `multa` ADD CONSTRAINT `multa_ibfk_2` FOREIGN KEY (`codFuncionario`) REFERENCES `funcionario`(`codFuncionario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `reclamacao` ADD CONSTRAINT `reclamacao_ibfk_1` FOREIGN KEY (`codMulta`) REFERENCES `multa`(`codMulta`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `municipio` ADD CONSTRAINT `municipio_ibfk_1` FOREIGN KEY (`idProvincia`) REFERENCES `provincia`(`idProvincia`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `pagamentomulta` ADD CONSTRAINT `pagamentomulta_ibfk_1` FOREIGN KEY (`codMulta`) REFERENCES `multa`(`codMulta`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `pagamentomulta` ADD CONSTRAINT `pagamentomulta_ibfk_2` FOREIGN KEY (`codFicheiroPagamento`) REFERENCES `ficheiro`(`idFicheiro`) ON DELETE SET NULL ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `pessoa` ADD CONSTRAINT `pessoa_ibfk_1` FOREIGN KEY (`codContacto`) REFERENCES `contacto`(`idContacto`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `pessoa` ADD CONSTRAINT `pessoa_ibfk_2` FOREIGN KEY (`codEndereco`) REFERENCES `endereco`(`idEndereco`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `pessoa` ADD CONSTRAINT `pessoa_ibfk_3` FOREIGN KEY (`codNacionalidade`) REFERENCES `pais`(`idPais`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `pessoa` ADD CONSTRAINT `pessoa_ibfk_4` FOREIGN KEY (`codBi`) REFERENCES `bi`(`idBi`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `titulopropriedade` ADD CONSTRAINT `titulopropriedade_ibfk_1` FOREIGN KEY (`codPessoa`) REFERENCES `pessoa`(`codPessoa`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `titulopropriedade` ADD CONSTRAINT `titulopropriedade_ibfk_2` FOREIGN KEY (`codViatura`) REFERENCES `viatura`(`codViatura`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `titulopropriedade` ADD CONSTRAINT `titulopropriedade_ibfk_3` FOREIGN KEY (`codFicheiroTituloPropriedade`) REFERENCES `ficheiro`(`idFicheiro`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `livrete` ADD CONSTRAINT `livrete_ibfk_2` FOREIGN KEY (`codViatura`) REFERENCES `viatura`(`codViatura`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `livrete` ADD CONSTRAINT `livrete_ibfk_3` FOREIGN KEY (`codServico`) REFERENCES `serivicoviatura`(`codServicoViatura`) ON DELETE RESTRICT ON UPDATE RESTRICT;
