-- DropForeignKey
ALTER TABLE `alertaroubo` DROP FOREIGN KEY `alertaroubo_ibfk_4`;

-- AddForeignKey
ALTER TABLE `alertaroubo` ADD CONSTRAINT `alertaroubo_ibfk_4` FOREIGN KEY (`codEndereco`) REFERENCES `endereco`(`idEndereco`) ON DELETE SET NULL ON UPDATE RESTRICT;
