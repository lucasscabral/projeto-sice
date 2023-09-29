/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `funcionarios` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `funcionarios_cpf_key` ON `funcionarios`(`cpf`);
