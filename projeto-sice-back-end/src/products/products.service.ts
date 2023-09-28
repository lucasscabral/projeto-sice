import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import * as dayjs from 'dayjs'
import { ProductsExceptionsFilter } from 'src/exceptions-filters/products.exceptions-filter';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) { }

  create(createProductDto: CreateProductDto) {
    const dueDateFormated = dayjs(createProductDto.dueDate).format()

    return this.prismaService.produtos.create({
      data: {
        nomeproduto: createProductDto.name,
        quantidade: createProductDto.quantity,
        vencimento: dueDateFormated,
        Categoria_idCategoria: createProductDto.categoryId
      }
    })
  }

  findAll() {
    return this.prismaService.produtos.findMany();
  }

  findOne(id: number) {
    return this.prismaService.produtos.findUniqueOrThrow({ where: { idprodutos: id } });
  }

  async retirarDoEstoque(id: number, updateProductDto: UpdateProductDto) {
    const dueDateFormated = dayjs(updateProductDto.dueDate).format()
    let remainingStock = 0;
    let haveQuantityInStock: boolean;
    await this.findOne(id).then((value) => {
      remainingStock = value.quantidade - updateProductDto.quantity;
      haveQuantityInStock = updateProductDto.quantity <= value.quantidade;
    })

    if (!haveQuantityInStock) {
      throw new ProductsExceptionsFilter()
    } else {
      return this.prismaService.produtos.update({
        where: { idprodutos: id }, data: {
          nomeproduto: updateProductDto.name,
          quantidade: remainingStock,
          vencimento: dueDateFormated,
          Categoria_idCategoria: updateProductDto.categoryId
        }
      });
    }
  }

  async reporEstoque(id: number, updateProductDto: UpdateProductDto) {
    const dueDateFormated = dayjs(updateProductDto.dueDate).format()
    let addToStock: number;
    await this.findOne(id).then((value) => {
      addToStock = value.quantidade + updateProductDto.quantity;
    })

    return this.prismaService.produtos.update({
      where: { idprodutos: id }, data: {
        nomeproduto: updateProductDto.name,
        quantidade: addToStock,
        vencimento: dueDateFormated,
        Categoria_idCategoria: updateProductDto.categoryId
      }
    });
  }

  remove(id: number) {
    return this.prismaService.produtos.delete({ where: { idprodutos: id } });
  }
}
