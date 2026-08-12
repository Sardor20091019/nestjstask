import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksRepo } from './tasks.repo';

@Module({
  controllers: [TasksController],
  providers: [TasksService, TasksRepo],
  exports: [TasksService],
})
export class TasksModule {}
