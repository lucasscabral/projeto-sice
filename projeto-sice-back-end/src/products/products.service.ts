import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import * as dayjs from 'dayjs'
import { HttpExceptionFilter, ProductsExceptionsFilter } from 'src/exceptions-filters/products.exceptions-filter';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) { }

  create(createProductDto: CreateProductDto) {
    const dueDateFormated = dayjs(createProductDto.dueDate).format()

    return this.prismaService.produtos.create({
      data: {
        nomeproduto: createProductDto.name,
        quantidade: +createProductDto.quantity,
        vencimento: dueDateFormated,
        valor_unitario: +createProductDto.unitaryValue,
        Categoria_idCategoria: createProductDto.categoryId,
        descricao: createProductDto.description
      }
    })
  }

  findAll() {
    return this.prismaService.produtos.findMany({ include: { categoria: true } });
  }

  findOne(id: number) {
    return this.prismaService.produtos.findUniqueOrThrow({ where: { idprodutos: id } });
  }

  editProduct(id: number, updateProductDto: UpdateProductDto) {
    const dueDateFormated = dayjs(updateProductDto.dueDate).format()
    let replaceComma = updateProductDto.unitaryValue.toString().replace(",", ".")

    return this.prismaService.produtos.update({
      where: { idprodutos: id }, data: {
        nomeproduto: updateProductDto.name,
        quantidade: +updateProductDto.quantity,
        vencimento: dueDateFormated,
        valor_unitario: +replaceComma,
        Categoria_idCategoria: updateProductDto.categoryId
      }
    })
  }

  async retirarDoEstoque(id: number, updateProductDto: UpdateProductDto) {
    const dueDateFormated = dayjs(updateProductDto.dueDate).format()
    let haveQuantityInStock: boolean;
    await this.findOne(id).then((value) => {
      haveQuantityInStock = updateProductDto.quantity <= value.quantidade;
    })

    if (!haveQuantityInStock) {
      throw new ProductsExceptionsFilter()
    } else {
      return this.prismaService.produtos.update({
        where: { idprodutos: id }, data: {
          nomeproduto: updateProductDto.name,
          quantidade: { decrement: updateProductDto.quantity },
          vencimento: dueDateFormated,
          valor_unitario: updateProductDto.unitaryValue,
          Categoria_idCategoria: updateProductDto.categoryId
        }
      });
    }
  }

  async reporEstoque(id: number, updateProductDto: UpdateProductDto) {

    return this.prismaService.produtos.update({
      where: { idprodutos: id }, data: {
        nomeproduto: updateProductDto.name,
        quantidade: { increment: updateProductDto.quantity },
        vencimento: updateProductDto.dueDate,
        valor_unitario: updateProductDto.unitaryValue,
        Categoria_idCategoria: updateProductDto.categoryId
      }
    });
  }

  async remove(id: number) {
    const existProduct = await this.prismaService.produtos.findUnique({ where: { idprodutos: id } });
    if (!existProduct) {
      throw new HttpExceptionFilter('Não existe produto com o id passado', 404);
    } else {
      return this.prismaService.produtos.delete({ where: { idprodutos: id } });
    }
  }
}
