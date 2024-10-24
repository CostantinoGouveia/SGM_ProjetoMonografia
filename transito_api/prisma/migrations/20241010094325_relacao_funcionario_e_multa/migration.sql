-- AddForeignKey
ALTER TABLE `multa` ADD CONSTRAINT `multa_ibfk_2` FOREIGN KEY (`codFuncionario`) REFERENCES `funcionario`(`codFuncionario`) ON DELETE RESTRICT ON UPDATE RESTRICT;
