-- DropForeignKey
ALTER TABLE `multa` DROP FOREIGN KEY `multa_ibfk_2`;

-- AlterTable
ALTER TABLE `multa` ALTER COLUMN `codFuncionario` DROP DEFAULT;

-- RedefineIndex
CREATE INDEX `idx_cod_funcionario` ON `multa`(`codFuncionario`);
DROP INDEX `codFuncionario` ON `multa`;
