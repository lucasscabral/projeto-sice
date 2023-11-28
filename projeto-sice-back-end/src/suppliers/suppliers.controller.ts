import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { CreatePurchasesDto } from './dto/create-purchasesdto';

@Controller('fornecedores')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) { }

  @Post()
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.suppliersService.create(createSupplierDto);
  }

  @Post("registrar-compras")
  registerPurchases(@Body() createPurchasesDto: CreatePurchasesDto) {
    this.suppliersService.registerPurchases(createPurchasesDto);
  }

  @Get()
  findAll() {
    return this.suppliersService.findAll();
  }

  @Get("lista-compras")
  findAllPurchase() {
    return this.suppliersService.findAllPurchase();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suppliersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto) {
    return this.suppliersService.update(+id, updateSupplierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suppliersService.remove(+id);
  }
}
