/*
  Warnings:

  - You are about to drop the column `precounitario` on the `itens_venda` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `itens_venda` DROP COLUMN `precounitario`;

-- AlterTable
ALTER TABLE `vendas` MODIFY `datavenda` DATE NULL DEFAULT CURRENT_TIMESTAMP(3);
