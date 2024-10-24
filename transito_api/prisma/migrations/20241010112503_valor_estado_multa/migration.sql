/*
  Warnings:

  - The values [NÃO PAGO] on the enum `multa_estadoMulta` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `multa` MODIFY `estadoMulta` ENUM('PAGO', 'NAO PAGO', 'PENDENTE') NOT NULL;
