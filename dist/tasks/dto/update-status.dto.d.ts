import { TaskStatus } from "../../enum/task-status.enum";
export declare class UpdateStatusDto {
    status: TaskStatus;
    done_at?: Date;
}
