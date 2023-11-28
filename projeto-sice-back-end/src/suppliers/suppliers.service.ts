import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { UtilsExceptionFilter } from 'src/exceptions-filters/utils.exceptions-filter';
import { CreatePurchasesDto } from './dto/create-purchasesdto';
import * as dayjs from 'dayjs'

@Injectable()
export class SuppliersService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createSupplierDto: CreateSupplierDto) {
    const existSupplier = await this.prismaService.fornecedores.findFirst({
      where: {
        CNPJ: createSupplierDto.CNPJ
      }
    })

    if (existSupplier) {
      throw new UtilsExceptionFilter("Já existe um fornecedor cadastrado com esse CNPJ!", 401);
    }
    return await this.prismaService.fornecedores.create({
      data: {
        nomefornecedor: createSupplierDto.nomefornecedor,
        CNPJ: createSupplierDto.CNPJ,
        endereco: createSupplierDto.endereco
        , fornecedoremail: {
          create: {
            email: createSupplierDto.email
          }
        }
        , fornecedortel: {
          create: {
            telefone: createSupplierDto.telefone
          }
        }
      },
      include: { fornecedoremail: true, fornecedortel: true }
    });
  }

  findAll() {
    return this.prismaService.fornecedores.findMany({
      select: { idfornecedor: true, nomefornecedor: true, CNPJ: true },
    });
  }

  async findAllPurchase() {
    const allItensPurchase = await this.prismaService.itensCompra.findMany({
      include:
      {
        produtos: true,
        compras: { include: { fornecedores: { select: { nomefornecedor: true } } } }
      }
    })
    const addTotalShoppingItems = allItensPurchase.map(value => {
      return { valorTotal: (value.quantidade * value.precounitario).toFixed(2), ...value }
    })

    return addTotalShoppingItems
  }

  async registerPurchases(createPurchasesDto: CreatePurchasesDto) {

    await this.prismaService.$transaction(async (tx) => {
      await Promise.all(
        createPurchasesDto.itensCompra.map(async ({ idprodutos, quantidade, categoria, descricao, nomeproduto, valor_unitario, vencimento }, id) => {
          const createPurchase = await this.prismaService.compras.create({ data: { Fornecedores_idfornecedor: +createPurchasesDto.idfornecedor } })
          const dueDateFormated = dayjs(vencimento).format()

          const product = tx.produtos.upsert({
            where: { idprodutos },
            update: { quantidade: { increment: createPurchasesDto.itensCompra[id].quantidade } },
            create: {
              nomeproduto,
              quantidade,
              valor_unitario: Number(valor_unitario),
              vencimento: dueDateFormated,
              Categoria_idCategoria: categoria,
              descricao
            }
          })

          const createItensPurchase = tx.itensCompra.create({
            data:
            {
              quantidade,
              Produtos_idprodutos: (await product).idprodutos,
              compras_idcompras: (await createPurchase).idcompras,
              precounitario: Number(createPurchasesDto.itensCompra[id].valor_unitario)
            }
          })
          return product && createItensPurchase
        })
      )
    })
  }


  async findOne(id: number) {
    if (Number.isNaN(id)) {
      return []
    }
    const purscherSupplier = await this.prismaService.fornecedores.findUnique({ where: { idfornecedor: id }, include: { compras: { include: { itenscompra: { select: { produtos: true } } } } } });

    if (purscherSupplier.compras.length === 0) {
      return []
    }
    const objectFilter = {}
    const arrayFilter = purscherSupplier.compras[0].itenscompra.filter((value) => {
      return objectFilter.hasOwnProperty(value.produtos.idprodutos) ? false : (objectFilter[value.produtos.idprodutos] = true)
    });

    return arrayFilter
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    return `This action updates a #${id} supplier`;
  }

  remove(id: number) {
    return `This action removes a #${id} supplier`;
  }
}
