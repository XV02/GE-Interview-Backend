import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty } from "class-validator";


export class XpDto {
    @ApiProperty()
    @IsNotEmpty()
    xp: number;

    @ApiProperty()
    @IsNotEmpty()
    employeeId: string;
}
