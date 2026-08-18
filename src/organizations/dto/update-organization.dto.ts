import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateOrganizationDto {
  @IsString()
  @ApiProperty({
    example: "DETROIT",
    description: "The name of the organization",
  })
  name: string;
}
