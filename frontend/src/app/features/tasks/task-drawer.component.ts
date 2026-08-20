import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  signal,
  effect,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { TaskService } from "../../core/task.service";
import { ApiService } from "../../core/api.service";
import { NotificationService } from "../../shared/services/notification.service";

interface ProjectOption {
  id: number;
  name: string;
}

interface UserOption {
  id: number;
  name: string;
}

@Component({
  selector: "app-task-drawer",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Backdrop overlay -->
    @if (isOpen) {
      <div
        class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity"
        (click)="close.emit()"
      ></div>
    }

    <!-- Slide-over panel -->
    <div
      class="fixed inset-y-0 right-0 z-50 w-full max-w-md transform bg-white shadow-2xl transition-transform duration-300 ease-in-out dark:bg-slate-900"
      [class.translate-x-full]="!isOpen"
      [class.translate-x-0]="isOpen"
    >
      <div
        class="flex h-full flex-col divide-y divide-slate-200 dark:divide-slate-800"
      >
        <!-- Header -->
        <div class="px-6 py-6 sm:px-8">
          <div class="flex items-start justify-between">
            <div>
              <h2 class="text-lg font-semibold text-slate-900 dark:text-white">
                Create New Task
              </h2>
              <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Fill in the details below to add a new task to your workspace.
              </p>
            </div>
            <div class="ml-3 flex h-7 items-center">
              <button
                type="button"
                class="rounded-md bg-white text-slate-400 hover:text-slate-500 focus:outline-none dark:bg-slate-900 dark:text-slate-500 dark:hover:text-slate-400"
                (click)="close.emit()"
              >
                <span class="sr-only">Close panel</span>
                <svg
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Form Content -->
        <div class="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          <form
            [formGroup]="form"
            id="task-form"
            (ngSubmit)="submit()"
            class="space-y-6 flex flex-col gap-5"
          >
            <!-- Title -->
            <div>
              <label for="title" class="label"
                >Task Title <span class="text-rose-500">*</span></label
              >
              <input
                type="text"
                id="title"
                formControlName="title"
                class="input"
                placeholder="e.g. Update user onboarding flow"
              />
              @if (
                form.controls.title.touched &&
                form.controls.title.errors?.["required"]
              ) {
                <p class="mt-1.5 text-xs text-rose-500">Title is required.</p>
              }
            </div>

            <!-- Due Date -->
            <div>
              <label for="due_date" class="label"
                >Due Date <span class="text-rose-500">*</span></label
              >
              <input
                type="datetime-local"
                id="due_date"
                formControlName="due_date"
                class="input"
              />
            </div>

            <!-- Project Dropdown -->
            <div>
              <label for="project_id" class="label"
                >Project <span class="text-rose-500">*</span></label
              >
              <select
                id="project_id"
                formControlName="project_id"
                class="input"
              >
                <option value="" disabled>Select a project...</option>
                @for (project of projects(); track project.id) {
                  <option [value]="project.id">{{ project.name }}</option>
                }
              </select>
            </div>

            <!-- Assignee Dropdown -->
            <div>
              <label for="worker_user_id" class="label"
                >Assignee <span class="text-rose-500">*</span></label
              >
              <select
                id="worker_user_id"
                formControlName="worker_user_id"
                class="input"
              >
                <option value="" disabled>Assign team member...</option>
                @for (user of users(); track user.id) {
                  <option [value]="user.id">{{ user.name }}</option>
                }
              </select>
            </div>

            <!-- Priority Mock (Disabled visual) -->
            <div>
              <label class="label">Priority (Simulated)</label>
              <div class="flex gap-2">
                <button
                  type="button"
                  class="flex-1 rounded-lg border border-slate-200 bg-white py-2 px-3 text-sm font-medium text-slate-500 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 cursor-not-allowed opacity-70"
                  disabled
                >
                  Low
                </button>
                <button
                  type="button"
                  class="flex-1 rounded-lg border border-brand-200 bg-brand-50 py-2 px-3 text-sm font-medium text-brand-700 shadow-sm ring-1 ring-brand-500/20 dark:border-brand-900/50 dark:bg-brand-950/30 dark:text-brand-400 dark:ring-brand-500/30 cursor-not-allowed opacity-70"
                  disabled
                >
                  Medium
                </button>
                <button
                  type="button"
                  class="flex-1 rounded-lg border border-slate-200 bg-white py-2 px-3 text-sm font-medium text-slate-500 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 cursor-not-allowed opacity-70"
                  disabled
                >
                  High
                </button>
              </div>
              <p class="mt-1.5 text-xs text-slate-400">
                Priority is currently not supported by the backend.
              </p>
            </div>
          </form>
        </div>

        <!-- Footer / Actions -->
        <div
          class="flex shrink-0 justify-end gap-3 px-6 py-6 sm:px-8 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50"
        >
          <button
            type="button"
            class="btn btn-secondary"
            (click)="close.emit()"
            [disabled]="submitting()"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="task-form"
            class="btn btn-primary"
            [disabled]="form.invalid || submitting()"
          >
            @if (submitting()) {
              <svg
                class="mr-2 h-4 w-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating...
            } @else {
              Create Task
            }
          </button>
        </div>
      </div>
    </div>
  `,
})
export class TaskDrawerComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  private readonly fb = inject(NonNullableFormBuilder);
  private readonly taskService = inject(TaskService);
  private readonly notifications = inject(NotificationService);
  private readonly api = inject(ApiService);

  readonly submitting = signal(false);

  readonly projects = signal<ProjectOption[]>([]);
  readonly users = signal<UserOption[]>([]);

  private getDefaultDate(): string {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(12, 0, 0, 0);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
  }

  readonly form = this.fb.group({
    title: ["", Validators.required],
    project_id: ["", Validators.required],
    worker_user_id: ["", Validators.required],
    due_date: [this.getDefaultDate(), Validators.required],
  });

  constructor() {
    effect(() => {
      if (this.isOpen) {
        this.form.reset({
          title: "",
          project_id: "",
          worker_user_id: "",
          due_date: this.getDefaultDate(),
        });
        this.fetchWorkspaceEntities();
      }
    });
  }

  private fetchWorkspaceEntities() {
    this.api.post<any, any>("/projects/findall", { limit: 50 }).subscribe({
      next: (res) => {
        const items = Array.isArray(res)
          ? res
          : res?.data || res?.items || res?.result || [];
        this.projects.set(
          items.map((p: any) => ({
            id: p.id,
            name: p.name || p.title || `Project #${p.id}`,
          })),
        );
      },
      error: (err) => {
        console.error("Failed to fetch projects:", err);
        this.projects.set([]);
      },
    });

    this.api.post<any, any>("/users/findall", { limit: 50 }).subscribe({
      next: (res) => {
        const items = Array.isArray(res)
          ? res
          : res?.data || res?.items || res?.result || [];
        this.users.set(
          items.map((u: any) => ({
            id: u.id,
            name: u.name || u.username || u.full_name || `User #${u.id}`,
          })),
        );
      },
      error: (err) => {
        console.error("Failed to fetch users:", err);
        this.users.set([]);
      },
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.submitting.set(true);
    const formValue = this.form.getRawValue();

    const payload = {
      ...formValue,
      project_id: Number(formValue.project_id),
      worker_user_id: Number(formValue.worker_user_id),
      due_date: new Date(formValue.due_date).toISOString(),
    };

    this.taskService.createTask(payload).subscribe({
      next: () => {
        this.submitting.set(false);
        this.notifications.success(
          "Task created successfully",
          formValue.title,
        );
        this.saved.emit();
        this.close.emit();
      },
      error: (err) => {
        this.submitting.set(false);
        this.notifications.error(
          err?.error?.message || "Failed to create task",
          "Error",
        );
      },
    });
  }
}