-- AlterTable
ALTER TABLE `alertaroubo` ADD COLUMN `status` VARCHAR(100) NULL DEFAULT 'Ativo',
    MODIFY `dataFeita` DATE NOT NULL DEFAULT (current_timestamp());
