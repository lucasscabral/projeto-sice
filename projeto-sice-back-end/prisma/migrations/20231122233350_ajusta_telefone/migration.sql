-- AlterTable
ALTER TABLE `compras` MODIFY `datacompra` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `funcionario_telefone` MODIFY `telefonefuncionario` VARCHAR(16) NOT NULL;
