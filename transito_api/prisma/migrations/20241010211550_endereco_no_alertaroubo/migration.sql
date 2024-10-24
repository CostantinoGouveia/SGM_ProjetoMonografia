-- AlterTable
ALTER TABLE `alertaroubo` ADD COLUMN `codEndereco` INTEGER NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX `codEndereco` ON `alertaroubo`(`codEndereco`);

-- AddForeignKey
ALTER TABLE `alertaroubo` ADD CONSTRAINT `alertaroubo_ibfk_4` FOREIGN KEY (`codEndereco`) REFERENCES `endereco`(`idEndereco`) ON DELETE RESTRICT ON UPDATE RESTRICT;
