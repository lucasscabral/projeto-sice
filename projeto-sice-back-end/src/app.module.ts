import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { EmployeesModule } from './employees/employees.module';
import { OfficeModule } from './office/office.module';
import { CategoryModule } from './category/category.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [ProductsModule, PrismaModule, EmployeesModule, OfficeModule, CategoryModule, SalesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
