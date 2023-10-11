-- AlterTable
ALTER TABLE `categoria` MODIFY `descricao` VARCHAR(500) NULL DEFAULT 'Sem Descrição dessa Categoria';

-- AlterTable
ALTER TABLE `produtos` ADD COLUMN `descricao` VARCHAR(500) NULL DEFAULT 'Sem Descrição desse Produto';
