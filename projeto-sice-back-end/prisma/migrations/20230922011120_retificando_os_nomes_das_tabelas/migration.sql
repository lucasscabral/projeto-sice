/*
  Warnings:

  - You are about to drop the `fornecedoremail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fornecedortel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `funcionariotelefone` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `itenscompra` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `itensvenda` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `fornecedoremail` DROP FOREIGN KEY `fk_FornecedorEmail_fornecedor1`;

-- DropForeignKey
ALTER TABLE `fornecedortel` DROP FOREIGN KEY `fk_FornecedorTel_fornecedor`;

-- DropForeignKey
ALTER TABLE `funcionariotelefone` DROP FOREIGN KEY `fk_FuncionarioTelefone_Funcionarios1`;

-- DropForeignKey
ALTER TABLE `itenscompra` DROP FOREIGN KEY `fk_ItensCompra_Produtos1`;

-- DropForeignKey
ALTER TABLE `itenscompra` DROP FOREIGN KEY `fk_ItensCompra_compras1`;

-- DropForeignKey
ALTER TABLE `itensvenda` DROP FOREIGN KEY `fk_ItensVenda_Produtos1`;

-- DropForeignKey
ALTER TABLE `itensvenda` DROP FOREIGN KEY `fk_ItensVenda_Vendas1`;

-- DropTable
DROP TABLE `fornecedoremail`;

-- DropTable
DROP TABLE `fornecedortel`;

-- DropTable
DROP TABLE `funcionariotelefone`;

-- DropTable
DROP TABLE `itenscompra`;

-- DropTable
DROP TABLE `itensvenda`;

-- CreateTable
CREATE TABLE `fornecedor_email` (
    `email` VARCHAR(120) NOT NULL,
    `fornecedor_idfornecedor` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`fornecedor_idfornecedor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fornecedor_tel` (
    `telefone` VARCHAR(14) NOT NULL,
    `fornecedor_idfornecedor` INTEGER NOT NULL,

    PRIMARY KEY (`fornecedor_idfornecedor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `funcionario_telefone` (
    `telefonefuncionario` VARCHAR(14) NOT NULL,
    `Funcionarios_idFuncionarios` INTEGER NOT NULL,

    PRIMARY KEY (`Funcionarios_idFuncionarios`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `itens_compra` (
    `idItensCompra` INTEGER NOT NULL AUTO_INCREMENT,
    `quantidade` INTEGER NOT NULL,
    `precounitario` DOUBLE NOT NULL,
    `Produtos_idprodutos` INTEGER NOT NULL,
    `compras_idcompras` INTEGER NOT NULL,

    INDEX `fk_ItensCompra_Produtos1_idx`(`Produtos_idprodutos`),
    INDEX `fk_ItensCompra_compras1_idx`(`compras_idcompras`),
    PRIMARY KEY (`idItensCompra`, `Produtos_idprodutos`, `compras_idcompras`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `itens_venda` (
    `idItensVenda` INTEGER NOT NULL AUTO_INCREMENT,
    `quantidade` INTEGER NOT NULL,
    `precounitario` DOUBLE NOT NULL,
    `Produtos_idprodutos` INTEGER NOT NULL,
    `Vendas_idVendas` INTEGER NOT NULL,

    INDEX `fk_ItensVenda_Produtos1_idx`(`Produtos_idprodutos`),
    INDEX `fk_ItensVenda_Vendas1_idx`(`Vendas_idVendas`),
    PRIMARY KEY (`idItensVenda`, `Produtos_idprodutos`, `Vendas_idVendas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `fornecedor_email` ADD CONSTRAINT `fk_FornecedorEmail_fornecedor1` FOREIGN KEY (`fornecedor_idfornecedor`) REFERENCES `fornecedores`(`idfornecedor`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `fornecedor_tel` ADD CONSTRAINT `fk_FornecedorTel_fornecedor` FOREIGN KEY (`fornecedor_idfornecedor`) REFERENCES `fornecedores`(`idfornecedor`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `funcionario_telefone` ADD CONSTRAINT `fk_FuncionarioTelefone_Funcionarios1` FOREIGN KEY (`Funcionarios_idFuncionarios`) REFERENCES `funcionarios`(`idFuncionarios`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `itens_compra` ADD CONSTRAINT `fk_ItensCompra_Produtos1` FOREIGN KEY (`Produtos_idprodutos`) REFERENCES `produtos`(`idprodutos`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `itens_compra` ADD CONSTRAINT `fk_ItensCompra_compras1` FOREIGN KEY (`compras_idcompras`) REFERENCES `compras`(`idcompras`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `itens_venda` ADD CONSTRAINT `fk_ItensVenda_Produtos1` FOREIGN KEY (`Produtos_idprodutos`) REFERENCES `produtos`(`idprodutos`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `itens_venda` ADD CONSTRAINT `fk_ItensVenda_Vendas1` FOREIGN KEY (`Vendas_idVendas`) REFERENCES `vendas`(`idVendas`) ON DELETE NO ACTION ON UPDATE NO ACTION;
