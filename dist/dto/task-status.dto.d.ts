import { TaskStatus } from "../enum/task-status.enum";
export declare class CreateTaskDto {
    title: string;
    project_id: number;
    status?: TaskStatus;
}
