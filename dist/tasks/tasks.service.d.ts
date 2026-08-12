import { TasksRepo } from './tasks.repo';
export declare class TasksService {
    private readonly tasksRepo;
    constructor(tasksRepo: TasksRepo);
    create(data: {
        title: string;
        created_by: number;
        created_at: number;
        project_id: number;
        due_date: Date;
        worker_user_id: number;
        status: 'CREATED' | 'IN_PROCESS' | 'DONE';
        done_at: Date;
    }): Promise<unknown>;
    findByWorker(workerUserId: number): Promise<any[]>;
    findByTask(): Promise<any[]>;
    findByStatus(status: string): Promise<any[]>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<unknown>;
    findByProject(id: number): Promise<void>;
    updateStatus(id: number, status: string): Promise<any>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
}
