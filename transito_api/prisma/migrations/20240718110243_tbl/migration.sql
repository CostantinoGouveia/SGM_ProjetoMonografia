/*
  Warnings:

  - You are about to drop the column `codInfracao` on the `multa` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `multa` DROP FOREIGN KEY `multa_ibfk_2`;

-- AlterTable
ALTER TABLE `ficheiro` MODIFY `dataEntrada` VARCHAR(20) NULL DEFAULT (current_timestamp());

-- AlterTable
ALTER TABLE `multa` DROP COLUMN `codInfracao`;

-- AlterTable
ALTER TABLE `pessoa` MODIFY `dataCadastro` VARCHAR(20) NULL DEFAULT (current_timestamp());
