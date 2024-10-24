-- AlterTable
ALTER TABLE `ficheiro` MODIFY `dataEntrada` VARCHAR(20) NULL DEFAULT (current_timestamp());

-- AlterTable
ALTER TABLE `pessoa` MODIFY `dataCadastro` VARCHAR(20) NULL DEFAULT (current_timestamp());

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

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`codPessoa`) REFERENCES `pessoa`(`codPessoa`) ON DELETE RESTRICT ON UPDATE RESTRICT;
