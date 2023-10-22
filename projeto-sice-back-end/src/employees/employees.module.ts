import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[JwtModule.register({
    global: true,
    secret: process.env.JWT_KEY_SECRET,
    signOptions: { expiresIn: '68878484826s' },
  }),],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
