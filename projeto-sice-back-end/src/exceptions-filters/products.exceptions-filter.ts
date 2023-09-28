import { ArgumentsHost, Catch, HttpException } from "@nestjs/common"
import { Response } from 'express';

export class ProductsExceptionsFilter extends HttpException {
    constructor() {
        super('unauthorized', 403)
    }
}
@Catch(HttpException)
export class HttpExceptionFilter extends HttpException {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        response
            .status(status)
            .json({
                statusCode: status,
                message: exception.message
            });
    }
}