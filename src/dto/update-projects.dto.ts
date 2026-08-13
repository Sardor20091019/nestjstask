import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateProjectsDto {
  @IsString()
  @ApiProperty({
    example: "DETROIT",
    description: "The name of the Projects",
  })
  name: string;
}
