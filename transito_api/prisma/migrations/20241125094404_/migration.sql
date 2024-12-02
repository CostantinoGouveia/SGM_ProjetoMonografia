/*
  Warnings:

  - You are about to alter the column `dataPagamento` on the `multa` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dataNotificacao` on the `notificacaomulta` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dataNotificacao` on the `notificacaoreclamacao` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dataCadastro` on the `pessoa` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `alertaroubo` MODIFY `dataFeita` DATE NOT NULL DEFAULT (current_timestamp()),
    MODIFY `horaFeita` TIME NOT NULL DEFAULT (current_timestamp());

-- AlterTable
ALTER TABLE `multa` MODIFY `dataPagamento` DATETIME NULL,
    MODIFY `horaFeita` TIME NOT NULL DEFAULT (current_timestamp()),
    MODIFY `dataLimite` DATETIME(3) NOT NULL DEFAULT (current_date + interval 15 day);

-- AlterTable
ALTER TABLE `notificacaomulta` MODIFY `dataNotificacao` DATETIME NOT NULL DEFAULT (current_timestamp());

-- AlterTable
ALTER TABLE `notificacaoreclamacao` MODIFY `dataNotificacao` DATETIME NOT NULL DEFAULT (current_timestamp());

-- AlterTable
ALTER TABLE `pessoa` MODIFY `dataCadastro` DATETIME NULL DEFAULT (current_timestamp());

-- CreateTable
CREATE TABLE `notificacaoalerta` (
    `codNotificacao` INTEGER NOT NULL AUTO_INCREMENT,
    `codAlertaRoubo` INTEGER NOT NULL,
    `dataNotificacao` DATETIME NOT NULL DEFAULT (current_timestamp()),
    `status` VARCHAR(50) NOT NULL DEFAULT 'pendente',
    `mensagem` TEXT NULL,

    INDEX `codAlertaRoubo`(`codAlertaRoubo`),
    PRIMARY KEY (`codNotificacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notificacaoalertafuncionario` (
    `codNotificacaoFuncionario` INTEGER NOT NULL AUTO_INCREMENT,
    `codNotificacao` INTEGER NOT NULL,
    `codFuncionario` INTEGER NOT NULL,
    `status` VARCHAR(50) NOT NULL DEFAULT 'pendente',

    INDEX `codNotificacao`(`codNotificacao`),
    INDEX `codFuncionario`(`codFuncionario`),
    PRIMARY KEY (`codNotificacaoFuncionario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `notificacaoalerta` ADD CONSTRAINT `notificacaoalerta_codAlertaRoubo_fkey` FOREIGN KEY (`codAlertaRoubo`) REFERENCES `alertaroubo`(`codAlertaRoubo`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `notificacaoalertafuncionario` ADD CONSTRAINT `notificacaoalertafuncionario_codNotificacao_fkey` FOREIGN KEY (`codNotificacao`) REFERENCES `notificacaoalerta`(`codNotificacao`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `notificacaoalertafuncionario` ADD CONSTRAINT `notificacaoalertafuncionario_codFuncionario_fkey` FOREIGN KEY (`codFuncionario`) REFERENCES `funcionario`(`codFuncionario`) ON DELETE CASCADE ON UPDATE RESTRICT;
