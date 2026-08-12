export declare class TasksRepo {
    updateStatus(id: number, status: string): Promise<any>;
    findById(id: number): Promise<any>;
    insert(data: {
        title?: string;
        created_by: number;
        project_id: number;
        due_date: Date;
        worker_user_id: number;
        status?: string;
        created_at?: number | Date;
        done_at?: Date;
    }): Promise<any>;
    findByWorker(workerUserId: number): Promise<any[]>;
    findByTask(): Promise<any[]>;
    findByStatus(status: string): Promise<any[]>;
    findByProject(): Promise<any[]>;
    findAll(): Promise<any[]>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
}
