import { TasksService } from "./tasks.service";
import { TaskStatus } from "../enum/task-status.enum";
import { CreateTaskDto } from "./dto/create-task.dto";
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(headers: any, body: CreateTaskDto): Promise<any>;
    findAll(workerUserId?: string, projectId?: string, status?: TaskStatus): Promise<any[]>;
    findByWorker(workerUserId?: string): Promise<any[]>;
    findByProject(projectId?: string): Promise<any[]>;
    status(status?: TaskStatus): Promise<any[]>;
    updateStatus(id: number, body: {
        status: string;
        worker_user_id: number;
    }): Promise<any>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
    findOne(id: string): Promise<any>;
}
