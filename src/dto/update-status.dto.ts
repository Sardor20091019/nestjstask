import { IsOptional, IsEnum } from "class-validator";
import { TaskStatus } from "../enum/task-status.enum";

export class updateStatus {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
