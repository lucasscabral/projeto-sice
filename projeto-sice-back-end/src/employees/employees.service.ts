import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { HttpExceptionFilter } from 'src/exceptions-filters/employees.exceptions-filter';
import { JwtService } from '@nestjs/jwt';
import { UtilsExceptionFilter } from 'src/exceptions-filters/utils.exceptions-filter';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class EmployeesService {
  constructor(private prismaService: PrismaService,
    private jwtService: JwtService) { }

  async create(createEmployeeDto: CreateEmployeeDto) {
    let transformCpf = createEmployeeDto.cpf.replaceAll(/[.|-]/g, "");

    const existPosition = await this.prismaService.cargo.findUnique({ where: { idCargo: createEmployeeDto.Cargo_idCargo } })

    const existEmployee = await this.prismaService.funcionarios.findUnique({ where: { cpf: transformCpf } })

    if (existEmployee) {
      throw new UtilsExceptionFilter("Esse usuário já existe!", 401);
    } else if (existPosition) {
      const [funcionarios] = await this.prismaService.$transaction([
        this.prismaService.funcionarios.create({
          data: {
            cpf: transformCpf,
            Cargo_idCargo: existPosition.idCargo,
            endereco: createEmployeeDto.endereco,
            nomefuncionario: createEmployeeDto.nomefuncionario,
            funcionariotelefone: {
              create: { telefonefuncionario: createEmployeeDto.funcionariotelefone ? createEmployeeDto.funcionariotelefone : "Não tem telefone cadastrado" }
            }
          }
        })
      ])
      return funcionarios;
    } else {
      throw new HttpExceptionFilter('Essa categoria não existe', 404);
    }
  }

  async signIn(LoginDto: LoginDto) {
    let transformCpf = LoginDto.cpf.replaceAll(/[.|-]/g, "");
    const { idFuncionarios, nomefuncionario, cargo, funcionariotelefone } = await this.prismaService.funcionarios.findUnique({ where: { cpf: transformCpf, AND: { nomefuncionario: LoginDto.nomefuncionario } }, include: { cargo: { select: { cargonome: true } }, funcionariotelefone: { select: { telefonefuncionario: true } } } });

    if (!idFuncionarios) {
      throw new UtilsExceptionFilter("Nome/CPF inválido!", 401);
    }
    const payload = {
      id: idFuncionarios,
      nome: nomefuncionario,
      cargo: cargo.cargonome,
      telefone: funcionariotelefone ? funcionariotelefone.telefonefuncionario : "Não tem telefone cadastrado"
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      payload
    };
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
          data: {
            cpf: transformCpf,
            Cargo_idCargo: existPosition.idCargo,
            endereco: updateEmployeeDto.endereco,
            nomefuncionario: updateEmployeeDto.nomefuncionario
          }
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
