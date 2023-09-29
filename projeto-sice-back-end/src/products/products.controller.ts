import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseFilters } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { HttpExceptionFilter } from 'src/exceptions-filters/products.exceptions-filter';

@Controller('produtos')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @HttpCode(201)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch('retirar/:id')
  @UseFilters(HttpExceptionFilter)
  retirarDoEstoque(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.retirarDoEstoque(+id, updateProductDto);
  }

  @HttpCode(201)

  @Patch('repor/:id')
  reporEstoque(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.reporEstoque(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
