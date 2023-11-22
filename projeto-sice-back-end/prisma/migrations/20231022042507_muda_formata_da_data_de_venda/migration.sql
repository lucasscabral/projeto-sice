/*
  Warnings:

  - You are about to alter the column `cpf` on the `funcionarios` table. The data in that column could be lost. The data in that column will be cast from `VarChar(250)` to `VarChar(11)`.

*/
-- AlterTable
ALTER TABLE `funcionarios` MODIFY `cpf` VARCHAR(11) NOT NULL;

-- AlterTable
ALTER TABLE `vendas` MODIFY `datavenda` DATETIME NULL DEFAULT CURRENT_TIMESTAMP(3);
