import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateOrganizationDto {
  @IsString()
  @ApiProperty({
    example: "DETROIT",
    description: "The name of the organization",
  })
  name: string;
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: "The ID of the user creating the organization",
  })
  created_by: number;
}
