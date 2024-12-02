/*
  Warnings:

  - You are about to alter the column `dataPagamento` on the `multa` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `dataNotificacao` on the `notificacaomulta` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime`.
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
ALTER TABLE `notificacaomulta` MODIFY `dataNotificacao` DATETIME NOT NULL DEFAULT (current_timestamp());

-- AlterTable
ALTER TABLE `pessoa` MODIFY `dataCadastro` DATETIME NULL DEFAULT (current_timestamp());
