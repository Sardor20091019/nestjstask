import { IsOptional, IsEnum, IsEmpty, IsDate } from "class-validator";
import { TaskStatus } from "../../enum/task-status.enum";

export class UpdateStatusDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsEmpty()
  @IsDate()
  done_at?: Date;
}
