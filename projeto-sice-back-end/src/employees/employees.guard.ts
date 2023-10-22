import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
import { UtilsExceptionFilter } from 'src/exceptions-filters/utils.exceptions-filter';
  
  @Injectable()
  export class EmployeeGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<any> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
    
      if (!token) {
        throw new UtilsExceptionFilter("Token não encontrado!",404);
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: process.env.JWT_KEY_SECRET
          }
        );
        request['user'] = payload;
      } catch {
        throw new UnauthorizedException();
      }
      return {id: request['user'].idFuncionarios, nome: request['user'].nomefuncionario};
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? []; 
      return type === 'Bearer' ? token : undefined;
    }
  }