import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { TaskService } from "../../core/task.service";
import { Task } from "../../core/models";

@Component({
  selector: "app-task-detail",
  standalone: true,
  imports: [CommonModule, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page-container flex flex-col h-full py-8 relative max-w-3xl mx-auto w-full">
      <!-- Header Section -->
      <div class="page-header flex items-center justify-between mb-6">
        <div>
          <h1 class="page-title">Task Details</h1>
          <p class="page-subtitle">Viewing detailed information for task #{{ taskId() }}</p>
        </div>
        <button
          type="button"
          class="btn btn-secondary"
          (click)="goBack()"
        >
          Back to Tasks
        </button>
      </div>

      <!-- Main Content Card -->
      <div class="card flex-1 p-6 md:p-8 flex flex-col gap-6">
        @if (loading()) {
          <div class="flex flex-col gap-4 py-12">
            <div class="skeleton h-8 w-3/4"></div>
            <div class="skeleton h-5 w-1/2"></div>
            <div class="skeleton h-24 w-full rounded-xl"></div>
          </div>
        } @else if (error()) {
          <div class="notice notice-error p-4">
            {{ error() }}
          </div>
        } @else if (task()) {
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Title</span>
              <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                {{ task()?.title }}
              </h2>
            </div>
            <div>
              <span
                class="inline-flex items-center rounded-md px-3 py-1 text-xs font-medium"
                [class.bg-blue-100]="task()?.status === 'CREATED'"
                [class.text-blue-700]="task()?.status === 'CREATED'"
                [class.bg-amber-100]="task()?.status === 'IN_PROGRESS'"
                [class.text-amber-700]="task()?.status === 'IN_PROGRESS'"
                [class.bg-emerald-100]="task()?.status === 'DONE'"
                [class.text-emerald-700]="task()?.status === 'DONE'"
              >
                {{ task()?.status }}
              </span>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div class="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800">
              <span class="text-slate-400 font-medium block mb-1">Task ID</span>
              <span class="text-slate-900 dark:text-slate-100 font-semibold">#{{ task()?.id }}</span>
            </div>

            <div class="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800">
              <span class="text-slate-400 font-medium block mb-1">Due Date</span>
              <span class="text-slate-900 dark:text-slate-100 font-semibold">
                {{ task()?.due_date | date: "mediumDate" }}
              </span>
            </div>

            <div class="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800">
              <span class="text-slate-400 font-medium block mb-1">Project</span>
              <span class="text-slate-900 dark:text-slate-100 font-semibold">
                Project #{{ task()?.project_id }}
              </span>
            </div>

            <div class="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800">
              <span class="text-slate-400 font-medium block mb-1">Assignee Worker ID</span>
              <span class="text-slate-900 dark:text-slate-100 font-semibold">
                Worker #{{ task()?.worker_user_id }}
              </span>
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class TaskDetailComponent implements OnInit {
  private readonly taskService = inject(TaskService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly taskId = signal<number | null>(null);
  readonly task = signal<Task | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get("id");
    if (idParam) {
      const id = Number(idParam);
      if (!isNaN(id)) {
        this.taskId.set(id);
        this.fetchTask(id);
      } else {
        this.error.set("Invalid task ID format.");
      }
    } else {
      this.error.set("No task ID provided.");
    }
  }

  private fetchTask(id: number): void {
    this.loading.set(true);
    this.error.set(null);

    this.taskService.findById(id).subscribe({
      next: (res) => {
        this.task.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        console.error("Failed to load task:", err);
        this.error.set("Could not load task details. Please check if the task exists.");
        this.loading.set(false);
      },
    });
  }

  goBack(): void {
    this.router.navigate(["/tasks"]);
  }
}