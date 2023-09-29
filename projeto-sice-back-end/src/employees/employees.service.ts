import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { HttpExceptionFilter } from 'src/exceptions-filters/employees.exceptions-filter';

@Injectable()
export class EmployeesService {
  constructor(private prismaService: PrismaService) { }

  async create(createEmployeeDto: CreateEmployeeDto) {
    let transformCpf = createEmployeeDto.cpf.replaceAll(/[.|-]/g, "");

    const existPosition = await this.prismaService.cargo.findUnique({ where: { idCargo: createEmployeeDto.Cargo_idCargo } })

    if (existPosition) {
      const [funcionarios] = await this.prismaService.$transaction([
        this.prismaService.funcionarios.create({
          data: { ...createEmployeeDto, cpf: transformCpf }
        })
      ])
      return funcionarios;
    } else {
      throw new HttpExceptionFilter('Essa categoria não existe', 404);
    }
  }

  findAll() {
    return this.prismaService.funcionarios.findMany({ include: { cargo: true } });
  }

  findOne(id: number) {
    return this.prismaService.funcionarios.findUniqueOrThrow({ where: { idFuncionarios: id }, include: { cargo: true } });
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    let transformCpf = updateEmployeeDto.cpf.replaceAll(/[.|-]/g, "");

    const existEmployee = await this.prismaService.funcionarios.findUnique({ where: { idFuncionarios: id } })
    const existPosition = await this.prismaService.cargo.findUnique({ where: { idCargo: updateEmployeeDto.Cargo_idCargo } })

    if (!existEmployee) {
      throw new HttpExceptionFilter('Não existe funcionário com o id passado', 404);
    } else if (!existPosition) {
      throw new HttpExceptionFilter('Essa categoria não existe', 404);
    } else {
      const [funcionarios] = await this.prismaService.$transaction([
        this.prismaService.funcionarios.update({
          where: { idFuncionarios: id },
          data: { ...updateEmployeeDto, cpf: transformCpf }
        })
      ])
      return funcionarios;
    }
  }

  async remove(id: number) {
    const existEmployee = await this.prismaService.funcionarios.findUnique({ where: { idFuncionarios: id } });
    if (!existEmployee) {
      throw new HttpExceptionFilter('Não existe funcionário com o id passado', 404);
    } else {
      return this.prismaService.funcionarios.delete({ where: { idFuncionarios: id } });
    }
  }
}
