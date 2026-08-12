import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt,
} from "class-validator";
import { TaskStatus } from "../enum/task-status.enum";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsInt()
  project_id: number;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
