import {
  Controller,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskStatus } from "../enum/task-status.enum";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post("create")
  create(
    @Body()
    body: CreateTaskDto,
  ) {
    return this.tasksService.create({
      title: body.title,
      project_id: body.project_id,
      worker_user_id: body.worker_user_id,
      due_date: new Date(body.due_date),
      created_by: body.created_by,
      status: TaskStatus.CREATED,
    });
  }

  @Post("findall")
  findAll(
    @Query("worker_user_id") workerUserId?: string,
    @Query("project_id") projectId?: string,
    @Query("status") status?: TaskStatus,
  ) {
    if (workerUserId) {
      return this.tasksService.findByWorker(+workerUserId);
    }
    if (projectId) {
      return this.tasksService.findByProject(+projectId);
    }
    if (status) {
      return this.tasksService.findByStatus(status);
    }
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

  @Post("updatestatus/:id")
  updateStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateStatusDto,
  ) {
    return this.tasksService.updateStatus(id, body.status);
  }

  @Post("remove/:id")
  remove(@Param("id") id: string) {
    return this.tasksService.remove(+id);
  }

  @Post(":id")
  findOne(@Param("id") id: string) {
    return this.tasksService.findOne(+id);
  }
}
