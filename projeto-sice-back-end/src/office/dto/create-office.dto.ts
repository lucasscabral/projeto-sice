import { IsNotEmpty, IsString } from "class-validator";


export class CreateOfficeDto {
    @IsNotEmpty()
    @IsString()
    cargonome: string
}
