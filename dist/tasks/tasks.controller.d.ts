import { TasksService } from "./tasks.service";
import { TaskStatus } from "../enum/task-status.enum";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(headers: any, body: CreateTaskDto): Promise<any>;
    findAll(workerUserId?: string, projectId?: string, status?: TaskStatus): Promise<any[]>;
    findByWorker(workerUserId?: string): Promise<any[]>;
    findByProject(projectId?: string): Promise<any[]>;
    status(status?: TaskStatus): Promise<any[]>;
    updateStatus(id: number, body: UpdateStatusDto): Promise<any>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
    findOne(id: string): Promise<any>;
}
