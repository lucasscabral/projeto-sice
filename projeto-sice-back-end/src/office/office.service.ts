import { Injectable } from '@nestjs/common';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/update-office.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { UtilsExceptionFilter } from 'src/exceptions-filters/utils.exceptions-filter';

@Injectable()
export class OfficeService {
  constructor(private prismaService: PrismaService) { }

  create(createOfficeDto: CreateOfficeDto) {
    return this.prismaService.cargo.create({ data: createOfficeDto });
  }

  findAll() {
    return this.prismaService.cargo.findMany({ include: { funcionarios: { include: { funcionariotelefone: true } } } });
  }

  findOne(id: number) {
    return this.prismaService.cargo.findUniqueOrThrow({ where: { idCargo: id }, include: { funcionarios: { include: { funcionariotelefone: true } } } });
  }

  async update(id: number, updateOfficeDto: UpdateOfficeDto) {
    const existOffice = await this.prismaService.cargo.findUnique({ where: { idCargo: id } });
    if (!existOffice) {
      throw new UtilsExceptionFilter('Não existe um cargo com o id passado!', 404);
    } else {
      return this.prismaService.cargo.update({ where: { idCargo: id }, data: updateOfficeDto });
    }
  }

  async remove(id: number) {
    const existOffice = await this.prismaService.cargo.findUnique({ where: { idCargo: id }, include: { funcionarios: true } });

    if (!existOffice) {
      throw new UtilsExceptionFilter('Não existe um cargo com o Id passado!', 404);
    } else {
      const idEmployee = existOffice.funcionarios[0].idFuncionarios;

      await this.prismaService.funcionarios.update({ where: { idFuncionarios: idEmployee }, data: { funcionariotelefone: { delete: {} } }, include: { funcionariotelefone: true } });
      await this.prismaService.cargo.update({ where: { idCargo: id }, data: { funcionarios: { deleteMany: {} } }, include: { funcionarios: true } });
      return this.prismaService.cargo.delete({ where: { idCargo: id } });
    }
  }
}
