import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'


@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
    catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        if (exception.code === 'P2025') {
            return response.status(404).json({
                statusCode: 404,
                message: exception.message
            })
        } else if (exception.code === 'P2002') {
            return response.status(401).json({
                statusCode: 401,
                message: "Esse CPF já está em uso"
            })
        } else if (exception.code === 'P2003') {
            return response.status(404).json({
                statusCode: 404,
                message: exception.message,
                url: exception.meta
            })
        }
        return response.status(500).json({
            statusCode: 500,
            message: 'Internal server error'
        })
    }
}