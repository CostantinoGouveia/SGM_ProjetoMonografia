/*
  Warnings:

  - You are about to alter the column `dataPagamento` on the `multa` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
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
ALTER TABLE `pessoa` MODIFY `dataCadastro` DATETIME NULL DEFAULT (current_timestamp());

-- AlterTable
ALTER TABLE `reclamacao` ADD COLUMN `codFuncionario` INTEGER NULL;

-- CreateIndex
CREATE INDEX `idx_cod_funcionario` ON `reclamacao`(`codFuncionario`);

-- AddForeignKey
ALTER TABLE `reclamacao` ADD CONSTRAINT `reclamacao_ibfk_2` FOREIGN KEY (`codFuncionario`) REFERENCES `funcionario`(`codFuncionario`) ON DELETE CASCADE ON UPDATE CASCADE;
