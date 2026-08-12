import { Controller, Post, Body, Param, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Body()
    body: {
      project_id: number;
      worker_user_id: number;
      title: string;
      due_date: string;
      created_by: number;
    },
  ) {
    return this.tasksService.create({
      title: body.title,
      project_id: body.project_id,
      worker_user_id: body.worker_user_id,
      due_date: new Date(body.due_date),
      created_by: body.created_by,
      created_at: Date.now(),
      status: 'CREATED',
      done_at: new Date(0),
    });
  }

  @Post('findall')
  findAll(
    @Query('worker_user_id') workerUserId?: string,
    @Query('project_id') projectId?: string,
    @Query('status') status?: string,
  ) {
    if (workerUserId) {
      return this.tasksService.findByWorker(+workerUserId);
    }
    if (projectId) {
      return this.tasksService.findByProject(+projectId);
    }
    if (status) {
      return this.tasksService.findByStatus(String(status));
    }
    return this.tasksService.findAll();
  }

  @Post('findByWorker')
  findByWorker(@Query('worker_user_id') workerUserId?: string) {
    return this.tasksService.findByWorker(workerUserId ? +workerUserId : 0);
  }

  @Post('findByProject')
  findByProject(@Query('project_id') projectId?: string) {
    return this.tasksService.findByProject(projectId ? +projectId : 0);
  }

  @Post('status')
  status(@Query('status') status?: string) {
    return this.tasksService.findByStatus(String(status));
  }

  @Post('updatestatus/:id')
  updateStatus(
    @Param('id') id: string,
    @Body() body: { status: 'CREATED' | 'IN_PROCESS' | 'DONE' },
  ) {
    return this.tasksService.updateStatus(+id, body.status);
  }

  @Post('remove/:id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }

  @Post(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }
}
