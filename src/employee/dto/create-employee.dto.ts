import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class CreateEmployeeDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    pronouns: string;

    @ApiProperty()
    instagramHandle?: string;

    @ApiProperty()
    profilePicture?: string;
}
