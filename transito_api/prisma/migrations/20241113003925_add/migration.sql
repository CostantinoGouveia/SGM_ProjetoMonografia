/*
  Warnings:

  - You are about to alter the column `dataPagamento` on the `multa` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dataCadastro` on the `pessoa` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Made the column `dataEmissao` on table `cartaconducao` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dataValidade` on table `cartaconducao` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dataPrimeiraEmissao` on table `cartaconducao` required. This step will fail if there are existing NULL values in that column.
  - Made the column `data` on table `multa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `descMulta` on table `multa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dataLimite` on table `multa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `statusTribunal` on table `multa` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `alertaroubo` MODIFY `dataFeita` DATE NOT NULL DEFAULT (current_timestamp()),
    MODIFY `horaFeita` TIME NOT NULL DEFAULT (current_timestamp());

-- AlterTable
ALTER TABLE `cartaconducao` MODIFY `dataEmissao` DATE NOT NULL,
    MODIFY `dataValidade` DATE NOT NULL,
    MODIFY `dataPrimeiraEmissao` DATE NOT NULL;

-- AlterTable
ALTER TABLE `ficheiro` MODIFY `dataEntrada` VARCHAR(20) NULL DEFAULT (current_timestamp());

-- AlterTable
ALTER TABLE `multa` MODIFY `data` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `dataPagamento` DATETIME NULL,
    MODIFY `horaFeita` TIME NOT NULL DEFAULT (current_timestamp()),
    MODIFY `descMulta` TEXT NOT NULL DEFAULT '',
    MODIFY `dataLimite` DATETIME(3) NOT NULL DEFAULT (current_date + interval 15 day),
    MODIFY `statusTribunal` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `pessoa` MODIFY `dataCadastro` DATETIME NULL DEFAULT (current_timestamp());
