-- AlterTable
ALTER TABLE `alertaroubo` ADD COLUMN `horaFeita` TIME NOT NULL DEFAULT (current_timestamp()),
    MODIFY `dataFeita` DATE NOT NULL DEFAULT (current_timestamp());

-- AlterTable
ALTER TABLE `multa` ADD COLUMN `dataLimite` DATETIME(3) NOT NULL DEFAULT (current_date + interval 15 day),
    ADD COLUMN `horaFeita` TIME NOT NULL DEFAULT (current_timestamp()),
    ADD COLUMN `statusTribunal` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `dataPagamento` DATETIME NULL;

-- AlterTable
ALTER TABLE `pagamentomulta` MODIFY `referencia` VARCHAR(191) NOT NULL DEFAULT '25436355';

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

-- AddForeignKey
ALTER TABLE `reclamacao` ADD CONSTRAINT `reclamacao_ibfk_1` FOREIGN KEY (`codMulta`) REFERENCES `multa`(`codMulta`) ON DELETE CASCADE ON UPDATE CASCADE;
