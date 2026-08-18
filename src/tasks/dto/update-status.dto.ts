import { IsOptional, IsEnum, IsEmpty } from "class-validator";
import { TaskStatus } from "../../enum/task-status.enum";

export class UpdateStatusDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsEmpty()
  done_at?: any;
}
//