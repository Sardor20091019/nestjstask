import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateProjectsDto {
  @IsString()
  @ApiProperty({
    example: "DETROIT",
    description: "The name of the project",
  })
  name: string;

  @IsNumber()
  @ApiProperty({
    example: 1,
    description: "The ID of the project",
  })
  org_id: number;

  @IsNumber()
  @ApiProperty({
    example: 1,
    description: "The ID of the user creating the project",
  })
  created_by: number;
}
//