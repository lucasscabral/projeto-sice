/*
  Warnings:

  - You are about to alter the column `telefonefuncionario` on the `funcionario_telefone` table. The data in that column could be lost. The data in that column will be cast from `VarChar(16)` to `VarChar(14)`.
  - Made the column `datavenda` on table `vendas` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `funcionario_telefone` MODIFY `telefonefuncionario` VARCHAR(14) NOT NULL;

-- AlterTable
ALTER TABLE `vendas` MODIFY `datavenda` DATE NOT NULL;
