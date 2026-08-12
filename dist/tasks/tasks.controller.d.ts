import { TasksService } from "./tasks.service";
import { TaskStatus } from "../enum/task-status.enum";
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(body: {
        project_id: number;
        worker_user_id: number;
        title: string;
        due_date: string;
        created_by: number;
    }): Promise<any>;
    findAll(workerUserId?: string, projectId?: string, status?: TaskStatus): Promise<any[]>;
    findByWorker(workerUserId?: string): Promise<any[]>;
    findByProject(projectId?: string): Promise<any[]>;
    status(status?: TaskStatus): Promise<any[]>;
    updateStatus(id: string, body: {
        status: TaskStatus;
    }): Promise<any>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
    findOne(id: string): Promise<any>;
}
