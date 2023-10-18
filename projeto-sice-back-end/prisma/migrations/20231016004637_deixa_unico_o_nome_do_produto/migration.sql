/*
  Warnings:

  - A unique constraint covering the columns `[nomeproduto]` on the table `produtos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `produtos_nomeproduto_key` ON `produtos`(`nomeproduto`);
