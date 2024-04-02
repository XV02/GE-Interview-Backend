import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty } from "class-validator";


export class TenantDto {
    @ApiProperty()
    @IsNotEmpty()
    tenantId: string;
}
