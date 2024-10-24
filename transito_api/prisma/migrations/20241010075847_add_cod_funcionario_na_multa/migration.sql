-- AlterTable
ALTER TABLE `multa` ADD COLUMN `codFuncionario` INTEGER NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX `codFuncionario` ON `multa`(`codFuncionario`);

-- AddForeignKey
ALTER TABLE `multa` ADD CONSTRAINT `multa_ibfk_2` FOREIGN KEY (`codFuncionario`) REFERENCES `funcionario`(`codFuncionario`) ON DELETE SET NULL ON UPDATE CASCADE;
