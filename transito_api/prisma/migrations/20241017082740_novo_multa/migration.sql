/*
  Warnings:

  - You are about to drop the column `dataPagamento` on the `pagamentomulta` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[referencia]` on the table `pagamentomulta` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `pagamentomulta` DROP FOREIGN KEY `pagamentomulta_ibfk_2`;

-- AlterTable
ALTER TABLE `alertaroubo` MODIFY `dataFeita` DATE NOT NULL DEFAULT (current_timestamp());

-- AlterTable
ALTER TABLE `multa` ADD COLUMN `dataPagamento` DATE NULL;

-- AlterTable
ALTER TABLE `pagamentomulta` DROP COLUMN `dataPagamento`,
    ADD COLUMN `dataCriacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `referencia` VARCHAR(191) NOT NULL DEFAULT '00000000000000000000',
    ADD COLUMN `status` VARCHAR(100) NOT NULL DEFAULT 'Pendente',
    MODIFY `codFicheiroPagamento` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `pagamentomulta_referencia_key` ON `pagamentomulta`(`referencia`);

-- AddForeignKey
ALTER TABLE `pagamentomulta` ADD CONSTRAINT `pagamentomulta_ibfk_2` FOREIGN KEY (`codFicheiroPagamento`) REFERENCES `ficheiro`(`idFicheiro`) ON DELETE SET NULL ON UPDATE RESTRICT;
