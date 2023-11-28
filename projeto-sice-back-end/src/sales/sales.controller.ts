import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { SalesService } from './sales.service';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { CreateSaleInfoDto } from './dto/create-sale-info';
import { EmployeeGuard } from 'src/employees/employees.guard';

@Controller('venda')
export class SalesController {
  constructor(private readonly salesService: SalesService) { }

  @UseGuards(EmployeeGuard)
  @Post()
  create(@Request() req, @Body() CreateSaleInfoDto: CreateSaleInfoDto) {
    const payload = req['user']
    return this.salesService.create(CreateSaleInfoDto, payload);
  }

  @Get()
  findAll() {
    return this.salesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(+id, updateSaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesService.remove(+id);
  }
}
