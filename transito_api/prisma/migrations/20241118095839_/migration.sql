/*
  Warnings:

  - You are about to alter the column `dataPagamento` on the `multa` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dataCadastro` on the `pessoa` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `bi` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(150)`.
  - You are about to alter the column `numeroAgente` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(150)`.
  - You are about to alter the column `telefone` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(150)`.

*/
-- DropIndex
DROP INDEX `usuario_bi_key` ON `usuario`;

-- DropIndex
DROP INDEX `usuario_numeroAgente_key` ON `usuario`;

-- DropIndex
DROP INDEX `usuario_telefone_key` ON `usuario`;

-- AlterTable
ALTER TABLE `alertaroubo` MODIFY `dataFeita` DATE NOT NULL DEFAULT (current_timestamp()),
    MODIFY `horaFeita` TIME NOT NULL DEFAULT (current_timestamp());

-- AlterTable
ALTER TABLE `multa` MODIFY `dataPagamento` DATETIME NULL,
    MODIFY `horaFeita` TIME NOT NULL DEFAULT (current_timestamp()),
    MODIFY `dataLimite` DATETIME(3) NOT NULL DEFAULT (current_date + interval 15 day);

-- AlterTable
ALTER TABLE `pessoa` MODIFY `dataCadastro` DATETIME NULL DEFAULT (current_timestamp());

-- AlterTable
ALTER TABLE `usuario` MODIFY `bi` VARCHAR(150) NOT NULL,
    MODIFY `numeroAgente` VARCHAR(150) NULL,
    MODIFY `telefone` VARCHAR(150) NOT NULL;
