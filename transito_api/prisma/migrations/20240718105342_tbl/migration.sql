-- AlterTable
ALTER TABLE `ficheiro` MODIFY `dataEntrada` VARCHAR(20) NULL DEFAULT (current_timestamp());

-- AlterTable
ALTER TABLE `pessoa` MODIFY `dataCadastro` VARCHAR(20) NULL DEFAULT (current_timestamp());
