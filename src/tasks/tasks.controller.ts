import { Controller, Post, Body, Headers } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskStatus } from "../enum/task-status.enum";
import { CreateTaskDto } from "./dto/create-task.dto";
import { findbytitleDTO } from "./dto/find-by-title.dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post("create")
  create(@Headers("user_id") userId: string, @Body() body: CreateTaskDto) {
    return this.tasksService.create(+userId, {
      title: body.title,
      project_id: body.project_id,
      worker_user_id: body.worker_user_id,
      due_date: new Date(body.due_date),
    });
  }

  @Post("findall")
  findAll(@Body() body: { name?: string; page?: number; limit?: number }) {
    return this.tasksService.findAll(body);
  }

  @Post("findByWorker")
  findByWorker(@Body() body: { worker_user_id?: number }) {
    return this.tasksService.findByWorker(
      body.worker_user_id ? +body.worker_user_id : 0,
    );
  }

  @Post("employee-tasks")
  getEmployeeTasksSummary(@Body() body: { worker_user_id?: number }) {
    return this.tasksService.getEmployeeTasksSummary(
      body.worker_user_id ? +body.worker_user_id : 0,
    );
  }

  @Post("employee-tasks-count")
  getEmployeeTasksCountSummary(@Body() body: { worker_user_id?: number }) {
    return this.tasksService.getEmployeeTasksCountSummary(
      body.worker_user_id ? +body.worker_user_id : 0,
    );
  }

  @Post("findByProject")
  findByProject(@Body() body: { project_id?: number }) {
    return this.tasksService.findByProject(
      body.project_id ? +body.project_id : 0,
    );
  }

  @Post("status")
  status(@Body() body: { status?: TaskStatus }) {
    return this.tasksService.findByStatus(body.status);
  }

  @Post("update-status")
  updateStatus(
    @Headers("user_id") userId: string,
    @Body() body: { id: number; status: TaskStatus },
  ) {
    return this.tasksService.updateStatus(+userId, body.id, body.status);
  }

  @Post("remove")
  remove(@Headers("user_id") userId: string, @Body() body: { id: number }) {
    return this.tasksService.remove(+userId, body.id);
  }

  @Post("findone")
  findOne(@Body() body: { id: number }) {
    return this.tasksService.findOne(body.id);
  }
  @Post("findbyitstitle")
  findbyitstitle(@Body() body: findbytitleDTO) {
    return this.tasksService.findbyitstitle(body.title);
  }
}
