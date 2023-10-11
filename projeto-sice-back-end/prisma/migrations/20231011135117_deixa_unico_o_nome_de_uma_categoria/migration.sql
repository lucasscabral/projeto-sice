/*
  Warnings:

  - A unique constraint covering the columns `[nomecategoria]` on the table `categoria` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `categoria_nomecategoria_key` ON `categoria`(`nomecategoria`);
