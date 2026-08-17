import {
  Controller,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
  Headers,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskStatus } from "../enum/task-status.enum";
import { CreateTaskDto } from "./dto/create-task.dto";

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
  findAll() {
    return this.tasksService.findAll();
  }

  @Post("findByWorker")
  findByWorker(@Query("worker_user_id") workerUserId?: string) {
    return this.tasksService.findByWorker(workerUserId ? +workerUserId : 0);
  }

  @Post("findByProject")
  findByProject(@Query("project_id") projectId?: string) {
    return this.tasksService.findByProject(projectId ? +projectId : 0);
  }

  @Post("status")
  status(@Query("status") status?: TaskStatus) {
    return this.tasksService.findByStatus(status);
  }

  @Post("update-status/:id")
  updateStatus(
    @Headers("user_id") userId: string,
    @Body() body: { id: number; status: TaskStatus },
  ) {
    return this.tasksService.updateStatus(+userId, body.id, body.status);
  }

  @Post("remove/:id")
  remove(
    @Headers("user_id") userId: string,
    @Param("id", ParseIntPipe) id: number,
  ) {
    return this.tasksService.remove(+userId, id);
  }

  @Post(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);
  }
}
