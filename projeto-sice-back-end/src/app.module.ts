import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [ProductsModule, PrismaModule, EmployeesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
