import { IsISO8601, IsNotEmpty, IsNumber, IsString, Min, MinLength } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @MinLength(5)
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    categoryId: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    quantity: number;

    @IsISO8601()
    dueDate: string;
}
