import { Transform } from "class-transformer";
import { IsISO8601, IsNotEmpty, IsNumber, IsString, Min, MinLength } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty({ message: "O nome não pode ser vázio" })
    @MinLength(2, { message: "O nome dever um tamanho mínimo de 2 caracteres" })
    @IsString({ message: "O nome dever ser alfabético" })
    name: string;

    @IsNotEmpty({ message: "O produto deve possuir uma categoria" })
    @IsNumber({}, { message: "Deve possuir uma categoria" })
    categoryId: number;

    @IsNotEmpty({ message: "A quantidade não pode ser vazia e deve possuir '.' em vez de ','" })
    @IsNumber({}, { message: "Deve ser um valor numérico" })
    @Min(0, { message: "O valor deve ser maior que 0" })
    @Transform(({ value }) => {
        return parseFloat(value)
    })
    unitaryValue: number;

    @IsISO8601({}, { message: "Deve possuir uma data" })
    dueDate: string;

    description?: string;
}
