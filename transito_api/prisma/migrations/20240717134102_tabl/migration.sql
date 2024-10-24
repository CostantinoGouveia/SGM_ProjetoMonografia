/*
  Warnings:

  - You are about to drop the column `MedidasPneumaticos` on the `livrete` table. All the data in the column will be lost.
  - You are about to drop the column `cilindrada` on the `livrete` table. All the data in the column will be lost.
  - You are about to drop the column `codMarca` on the `livrete` table. All the data in the column will be lost.
  - You are about to drop the column `conbustivel` on the `livrete` table. All the data in the column will be lost.
  - You are about to drop the column `corViatura` on the `livrete` table. All the data in the column will be lost.
  - You are about to drop the column `distanciaEixo` on the `livrete` table. All the data in the column will be lost.
  - You are about to drop the column `lotacao` on the `livrete` table. All the data in the column will be lost.
  - You are about to drop the column `modelo` on the `livrete` table. All the data in the column will be lost.
  - You are about to drop the column `numeroCilindro` on the `livrete` table. All the data in the column will be lost.
  - You are about to drop the column `numeroQuadro` on the `livrete` table. All the data in the column will be lost.
  - You are about to drop the column `peso` on the `livrete` table. All the data in the column will be lost.
  - You are about to drop the column `tara` on the `livrete` table. All the data in the column will be lost.
  - You are about to drop the column `tipoCaixa` on the `livrete` table. All the data in the column will be lost.
  - You are about to drop the column `numeroMatricula` on the `viatura` table. All the data in the column will be lost.
  - Added the required column `numeroMatricula` to the `livrete` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MedidasPneumaticos` to the `viatura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cilindrada` to the `viatura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codMarca` to the `viatura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `conbustivel` to the `viatura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `corViatura` to the `viatura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `distanciaEixo` to the `viatura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lotacao` to the `viatura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modelo` to the `viatura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numeroCilindro` to the `viatura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numeroQuadro` to the `viatura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `peso` to the `viatura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tara` to the `viatura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoCaixa` to the `viatura` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `livrete` DROP FOREIGN KEY `livrete_ibfk_1`;

-- AlterTable
ALTER TABLE `ficheiro` MODIFY `dataEntrada` VARCHAR(20) NULL DEFAULT (current_timestamp());

-- AlterTable
ALTER TABLE `livrete` DROP COLUMN `MedidasPneumaticos`,
    DROP COLUMN `cilindrada`,
    DROP COLUMN `codMarca`,
    DROP COLUMN `conbustivel`,
    DROP COLUMN `corViatura`,
    DROP COLUMN `distanciaEixo`,
    DROP COLUMN `lotacao`,
    DROP COLUMN `modelo`,
    DROP COLUMN `numeroCilindro`,
    DROP COLUMN `numeroQuadro`,
    DROP COLUMN `peso`,
    DROP COLUMN `tara`,
    DROP COLUMN `tipoCaixa`,
    ADD COLUMN `numeroMatricula` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `pessoa` MODIFY `dataCadastro` VARCHAR(20) NULL DEFAULT (current_timestamp());

-- AlterTable
ALTER TABLE `viatura` DROP COLUMN `numeroMatricula`,
    ADD COLUMN `MedidasPneumaticos` VARCHAR(100) NOT NULL,
    ADD COLUMN `cilindrada` VARCHAR(100) NOT NULL,
    ADD COLUMN `codMarca` INTEGER NOT NULL,
    ADD COLUMN `conbustivel` VARCHAR(100) NOT NULL,
    ADD COLUMN `corViatura` VARCHAR(100) NOT NULL,
    ADD COLUMN `distanciaEixo` VARCHAR(100) NOT NULL,
    ADD COLUMN `lotacao` VARCHAR(100) NOT NULL,
    ADD COLUMN `modelo` VARCHAR(200) NOT NULL,
    ADD COLUMN `numeroCilindro` VARCHAR(100) NOT NULL,
    ADD COLUMN `numeroQuadro` VARCHAR(100) NOT NULL,
    ADD COLUMN `peso` VARCHAR(100) NOT NULL,
    ADD COLUMN `tara` VARCHAR(100) NOT NULL,
    ADD COLUMN `tipoCaixa` VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE INDEX `codMarca` ON `viatura`(`codMarca`);

-- AddForeignKey
ALTER TABLE `viatura` ADD CONSTRAINT `livrete_ibfk_1` FOREIGN KEY (`codMarca`) REFERENCES `marca`(`codMarca`) ON DELETE RESTRICT ON UPDATE RESTRICT;
