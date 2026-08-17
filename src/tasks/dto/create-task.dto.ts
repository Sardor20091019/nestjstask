import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreateTaskDto {
  @IsString()
  @ApiProperty({
    example: "Build login page",
    description: "The title of the task",
  })
  title: string;

  @IsNumber()
  @ApiProperty({ example: 1, description: "The ID of the project" })
  project_id: number;

  @IsNumber()
  @ApiProperty({
    example: 2,
    description: "The ID of the worker assigned to the task",
  })
  worker_user_id: number;

  @IsDateString()
  @ApiProperty({
    example: "2026-12-31T23:59:59.000Z",
    description: "The due date of the task in ISO format",
  })
  due_date: string;

  @IsNumber()
  @ApiProperty({
    example: 1,
    description: "The ID of the user creating the task",
  })
  created_by: number;
}
