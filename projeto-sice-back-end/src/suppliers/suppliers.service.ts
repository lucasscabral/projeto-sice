import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { UtilsExceptionFilter } from 'src/exceptions-filters/utils.exceptions-filter';

@Injectable()
export class SuppliersService {
  constructor(private readonly prismaService:PrismaService){}

  async create(createSupplierDto: CreateSupplierDto) {
    const existSupplier = await this.prismaService.fornecedores.findFirst({
      where:{
        CNPJ:createSupplierDto.CNPJ
      }
    })

    if(existSupplier){
      throw new UtilsExceptionFilter("Já existe um fornecedor cadastrado com esse CNPJ!",401);
    }
    return await this.prismaService.fornecedores.create({data:{
      nomefornecedor:createSupplierDto.nomefornecedor,
      CNPJ:createSupplierDto.CNPJ,
      endereco:createSupplierDto.endereco
      ,fornecedoremail:{create:{
        email:createSupplierDto.email
      }}
      ,fornecedortel:{create:{
        telefone:createSupplierDto.telefone
      }}
    },
    include:{fornecedoremail:true,fornecedortel:true}  
  });
  }

  findAll() {
    return this.prismaService.fornecedores.findMany({select:{idfornecedor:true,nomefornecedor:true,CNPJ:true}});
  }

  findOne(id: number) {
    return `This action returns a #${id} supplier`;
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    return `This action updates a #${id} supplier`;
  }

  remove(id: number) {
    return `This action removes a #${id} supplier`;
  }
}
