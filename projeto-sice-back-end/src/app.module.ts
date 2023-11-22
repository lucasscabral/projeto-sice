import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { EmployeesModule } from './employees/employees.module';
import { OfficeModule } from './office/office.module';
import { CategoryModule } from './category/category.module';
import { SalesModule } from './sales/sales.module';
import { SuppliersModule } from './suppliers/suppliers.module';

@Module({
  imports: [ProductsModule, PrismaModule, EmployeesModule, OfficeModule, CategoryModule, SalesModule, SuppliersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
