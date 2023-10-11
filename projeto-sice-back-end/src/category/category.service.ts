import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UtilsExceptionFilter } from 'src/exceptions-filters/utils.exceptions-filter';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) { }
  async create(createCategoryDto: CreateCategoryDto) {
    const existCategory = await this.prismaService.categoria.findUnique({ where: { nomecategoria: createCategoryDto.nomecategoria } });
    if (existCategory) {
      throw new UtilsExceptionFilter("Essa categoria já existe", 401);
    } else {
      return this.prismaService.categoria.create({ data: createCategoryDto });
    }
  }

  findAll() {
    return this.prismaService.categoria.findMany();
  }

  async findOne(id: number) {
    const existCategory = await this.prismaService.categoria.findUnique({ where: { idCategoria: id } });
    if (!existCategory) {
      throw new UtilsExceptionFilter("Essa categoria não existe", 404);
    }
    return this.prismaService.categoria.findUniqueOrThrow({ where: { idCategoria: id } });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const existCategory = await this.prismaService.categoria.findUnique({ where: { idCategoria: id } });
    if (!existCategory) {
      throw new UtilsExceptionFilter("Essa categoria não existe", 404);
    }
    return this.prismaService.categoria.update({ where: { idCategoria: id }, data: updateCategoryDto });
  }

  async remove(id: number) {
    const existCategory = await this.prismaService.categoria.findUnique({ where: { idCategoria: id } });
    if (!existCategory) {
      throw new UtilsExceptionFilter("Essa categoria não existe", 404);
    }
    return this.prismaService.categoria.delete({ where: { idCategoria: id } });
  }
}
