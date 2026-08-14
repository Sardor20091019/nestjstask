import { TasksRepo } from "./tasks.repo";
import { TaskStatus } from "../enum/task-status.enum";
export declare class TasksService {
    private readonly tasksRepo;
    constructor(tasksRepo: TasksRepo);
    create(isadminornotID: number, data: {
        title: string;
        created_by: number;
        created_at?: Date;
        project_id: number;
        due_date: Date;
        worker_user_id: number;
        status?: TaskStatus;
        done_at?: Date;
    }): Promise<any>;
    findByWorker(workerUserId: number): Promise<any[]>;
    findByTask(): Promise<any[]>;
    findByStatus(status: TaskStatus): Promise<any[]>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    findByProject(projectId: number): Promise<any[]>;
    updateStatus(id: number, status: TaskStatus, worker_user_id: number): Promise<any>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
}
