import { TasksService } from './tasks.service';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(body: {
        project_id: number;
        worker_user_id: number;
        title: string;
        due_date: string;
        created_by: number;
    }): Promise<unknown>;
    findAll(workerUserId?: string, projectId?: string, status?: string): Promise<any[]> | Promise<void>;
    findByWorker(workerUserId?: string): Promise<any[]>;
    findByProject(projectId?: string): Promise<void>;
    status(status?: string): Promise<any[]>;
    updateStatus(id: string, body: {
        status: 'CREATED' | 'IN_PROCESS' | 'DONE';
    }): Promise<any>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
    findOne(id: string): Promise<unknown>;
}
