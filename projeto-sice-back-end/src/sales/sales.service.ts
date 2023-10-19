import { Injectable } from '@nestjs/common';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { UtilsExceptionFilter } from 'src/exceptions-filters/utils.exceptions-filter';
import { CreateSaleInfoDto } from './dto/create-sale-info';
import dayjs from 'dayjs';


@Injectable()
export class SalesService {
  constructor(private prismaService: PrismaService) { }

  async create(CreateSaleInfoDto: CreateSaleInfoDto) {
    console.log(CreateSaleInfoDto)
    const sale = await this.prismaService.vendas.create({ data: { datavenda: dayjs().format('DD/MM/YYYY'), Funcionarios_idFuncionarios: 1, formasDePagamento: CreateSaleInfoDto[0].formaPagamento } })


    await this.prismaService.$transaction(async (tx) => {
      await Promise.all(
        CreateSaleInfoDto.itensVenda.map(async ({ Produtos_idprodutos }, id) => {
          let productUnique = await tx.produtos.findUnique({ where: { idprodutos: Produtos_idprodutos } })

          if (productUnique.quantidade < CreateSaleInfoDto.itensVenda[id].quantidade) {
            throw new UtilsExceptionFilter(`Não tem estoque suficiente para o produto nº ${productUnique.idprodutos}`, 401);
          }
          return tx.produtos.update({ where: { idprodutos: Produtos_idprodutos }, data: { quantidade: { decrement: CreateSaleInfoDto.itensVenda[id].quantidade } } })
        })
      )
    })
  }

  findAll() {
    return this.prismaService.itensVenda.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
