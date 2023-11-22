import { Injectable } from '@nestjs/common';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { UtilsExceptionFilter } from 'src/exceptions-filters/utils.exceptions-filter';
import { CreateSaleInfoDto, FormaPagamento } from './dto/create-sale-info';

@Injectable()
export class SalesService {
  constructor(private prismaService: PrismaService) { }

  async create(CreateSaleInfoDto: CreateSaleInfoDto,payload:{id: number, nome: string}) {
    const formaPagamento : FormaPagamento = CreateSaleInfoDto.formaPagamento

    const sale= await this.prismaService.vendas.create({ data: 
      { Funcionarios_idFuncionarios: +payload.id, 
        formasDePagamento: formaPagamento} })

    await this.prismaService.$transaction(async (tx) => {
      await Promise.all(
        CreateSaleInfoDto.itensVenda.map(async ({ idprodutos }, id) => {
          let productUnique = await tx.produtos.findUnique({ where: { idprodutos } })

          if (productUnique.quantidade < CreateSaleInfoDto.itensVenda[id].quantidade) {
            throw new UtilsExceptionFilter(`Não tem estoque suficiente para o produto nº ${productUnique.idprodutos}`, 401);
          }
          return tx.produtos.update({ 
            where: { idprodutos }, 
            data: { quantidade: { decrement: CreateSaleInfoDto.itensVenda[id].quantidade } } })
        })
      )
    })
    await this.prismaService.$transaction(async (tx) => {
      await Promise.all(
        CreateSaleInfoDto.itensVenda.map(async ({ quantidade,idprodutos }, id) => {
          return tx.itensVenda.create({data:
            {quantidade:quantidade,
              Produtos_idprodutos:idprodutos,
              Vendas_idVendas:sale.idVendas} })
        })
      )
    })
  }

  findAll() {
    return this.prismaService.vendas.findMany({include:{funcionarios:{select:{idFuncionarios:true,nomefuncionario:true}},itensvenda:true}});
  }

  async findOne(id: number) {
    const uniqueSales = await this.prismaService.vendas.findUnique({where:{idVendas:id},include:{funcionarios:{select:{idFuncionarios:true,nomefuncionario:true}},itensvenda:true}});
    if(!uniqueSales) throw new UtilsExceptionFilter("Venda não encontrada!",404);
    return uniqueSales
  
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
