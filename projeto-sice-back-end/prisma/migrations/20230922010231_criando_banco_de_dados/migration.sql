-- CreateTable
CREATE TABLE `cargo` (
    `idCargo` INTEGER NOT NULL AUTO_INCREMENT,
    `cargonome` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`idCargo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoria` (
    `idCategoria` INTEGER NOT NULL AUTO_INCREMENT,
    `nomecategoria` VARCHAR(100) NOT NULL,
    `descricao` VARCHAR(500) NULL,

    PRIMARY KEY (`idCategoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `compras` (
    `idcompras` INTEGER NOT NULL AUTO_INCREMENT,
    `datacompra` DATE NOT NULL,
    `Fornecedores_idfornecedor` INTEGER NOT NULL,

    UNIQUE INDEX `compras_idcompras_key`(`idcompras`),
    INDEX `fk_compras_Fornecedores1_idx`(`Fornecedores_idfornecedor`),
    PRIMARY KEY (`idcompras`, `Fornecedores_idfornecedor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fornecedoremail` (
    `email` VARCHAR(120) NOT NULL,
    `fornecedor_idfornecedor` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`fornecedor_idfornecedor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fornecedores` (
    `idfornecedor` INTEGER NOT NULL AUTO_INCREMENT,
    `nomefornecedor` VARCHAR(200) NOT NULL,
    `endereco` VARCHAR(500) NOT NULL,
    `CNPJ` VARCHAR(14) NOT NULL,

    PRIMARY KEY (`idfornecedor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fornecedortel` (
    `telefone` VARCHAR(14) NOT NULL,
    `fornecedor_idfornecedor` INTEGER NOT NULL,

    PRIMARY KEY (`fornecedor_idfornecedor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `funcionarios` (
    `idFuncionarios` INTEGER NOT NULL AUTO_INCREMENT,
    `nomefuncionario` VARCHAR(200) NOT NULL,
    `endereco` VARCHAR(500) NOT NULL,
    `Cargo_idCargo` INTEGER NOT NULL,
    `cpf` VARCHAR(11) NOT NULL,

    UNIQUE INDEX `funcionarios_idFuncionarios_key`(`idFuncionarios`),
    INDEX `fk_Funcionarios_Cargo1_idx`(`Cargo_idCargo`),
    PRIMARY KEY (`idFuncionarios`, `Cargo_idCargo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `funcionariotelefone` (
    `telefonefuncionario` VARCHAR(14) NOT NULL,
    `Funcionarios_idFuncionarios` INTEGER NOT NULL,

    PRIMARY KEY (`Funcionarios_idFuncionarios`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `itenscompra` (
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
CREATE TABLE `itensvenda` (
    `idItensVenda` INTEGER NOT NULL AUTO_INCREMENT,
    `quantidade` INTEGER NOT NULL,
    `precounitario` DOUBLE NOT NULL,
    `Produtos_idprodutos` INTEGER NOT NULL,
    `Vendas_idVendas` INTEGER NOT NULL,

    INDEX `fk_ItensVenda_Produtos1_idx`(`Produtos_idprodutos`),
    INDEX `fk_ItensVenda_Vendas1_idx`(`Vendas_idVendas`),
    PRIMARY KEY (`idItensVenda`, `Produtos_idprodutos`, `Vendas_idVendas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produtos` (
    `idprodutos` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeproduto` VARCHAR(120) NOT NULL,
    `Categoria_idCategoria` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `vencimento` DATE NOT NULL,

    UNIQUE INDEX `produtos_idprodutos_key`(`idprodutos`),
    INDEX `fk_Produtos_Categoria1_idx`(`Categoria_idCategoria`),
    PRIMARY KEY (`idprodutos`, `Categoria_idCategoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vendas` (
    `idVendas` INTEGER NOT NULL AUTO_INCREMENT,
    `datavenda` DATE NOT NULL,
    `Funcionarios_idFuncionarios` INTEGER NOT NULL,
    `formasDePagamento` ENUM('Dinheiro', 'Pix', 'Credito', 'Debito') NOT NULL,

    UNIQUE INDEX `vendas_idVendas_key`(`idVendas`),
    INDEX `fk_Vendas_Funcionarios1_idx`(`Funcionarios_idFuncionarios`),
    PRIMARY KEY (`idVendas`, `Funcionarios_idFuncionarios`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `compras` ADD CONSTRAINT `fk_compras_Fornecedores1` FOREIGN KEY (`Fornecedores_idfornecedor`) REFERENCES `fornecedores`(`idfornecedor`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `fornecedoremail` ADD CONSTRAINT `fk_FornecedorEmail_fornecedor1` FOREIGN KEY (`fornecedor_idfornecedor`) REFERENCES `fornecedores`(`idfornecedor`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `fornecedortel` ADD CONSTRAINT `fk_FornecedorTel_fornecedor` FOREIGN KEY (`fornecedor_idfornecedor`) REFERENCES `fornecedores`(`idfornecedor`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `funcionarios` ADD CONSTRAINT `fk_Funcionarios_Cargo1` FOREIGN KEY (`Cargo_idCargo`) REFERENCES `cargo`(`idCargo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `funcionariotelefone` ADD CONSTRAINT `fk_FuncionarioTelefone_Funcionarios1` FOREIGN KEY (`Funcionarios_idFuncionarios`) REFERENCES `funcionarios`(`idFuncionarios`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `itenscompra` ADD CONSTRAINT `fk_ItensCompra_Produtos1` FOREIGN KEY (`Produtos_idprodutos`) REFERENCES `produtos`(`idprodutos`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `itenscompra` ADD CONSTRAINT `fk_ItensCompra_compras1` FOREIGN KEY (`compras_idcompras`) REFERENCES `compras`(`idcompras`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `itensvenda` ADD CONSTRAINT `fk_ItensVenda_Produtos1` FOREIGN KEY (`Produtos_idprodutos`) REFERENCES `produtos`(`idprodutos`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `itensvenda` ADD CONSTRAINT `fk_ItensVenda_Vendas1` FOREIGN KEY (`Vendas_idVendas`) REFERENCES `vendas`(`idVendas`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `produtos` ADD CONSTRAINT `fk_Produtos_Categoria1` FOREIGN KEY (`Categoria_idCategoria`) REFERENCES `categoria`(`idCategoria`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `vendas` ADD CONSTRAINT `fk_Vendas_Funcionarios1` FOREIGN KEY (`Funcionarios_idFuncionarios`) REFERENCES `funcionarios`(`idFuncionarios`) ON DELETE NO ACTION ON UPDATE NO ACTION;
