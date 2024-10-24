/*
  Warnings:

  - You are about to drop the column `numeroMatricula` on the `livrete` table. All the data in the column will be lost.
  - Added the required column `numeroMatricula` to the `viatura` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ficheiro` MODIFY `dataEntrada` VARCHAR(20) NULL DEFAULT (current_timestamp());

-- AlterTable
ALTER TABLE `livrete` DROP COLUMN `numeroMatricula`;

-- AlterTable
ALTER TABLE `pessoa` MODIFY `dataCadastro` VARCHAR(20) NULL DEFAULT (current_timestamp());

-- AlterTable
ALTER TABLE `viatura` ADD COLUMN `numeroMatricula` VARCHAR(50) NOT NULL;
