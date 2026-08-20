import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  inject,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { NotificationService } from "../../shared/services/notification.service";

interface ProjectOption {
  id: number;
  name: string;
}

interface UserOption {
  id: number;
  name: string;
}

const API_BASE_URL = "https://nestjstask-1.onrender.com";

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
export class TaskDrawerComponent implements OnChanges {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  private readonly fb = inject(NonNullableFormBuilder);
  private readonly http = inject(HttpClient);
  private readonly notifications = inject(NotificationService);

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

  ngOnChanges(changes: SimpleChanges) {
    if (changes["isOpen"] && changes["isOpen"].currentValue === true) {
      this.form.reset({
        title: "",
        project_id: "",
        worker_user_id: "",
        due_date: this.getDefaultDate(),
      });
      this.fetchWorkspaceEntities();
    }
  }

  private fetchWorkspaceEntities() {
    const body = { name: "", limit: 50, page: 1 };

    this.http.post<any>(`${API_BASE_URL}/projects/findall`, body).subscribe({
      next: (res: any) => {
        const items = Array.isArray(res)
          ? res
          : res?.data || res?.items || res?.result || res?.data?.data || [];
        this.projects.set(
          items.map((p: any) => ({
            id: p.id,
            name: p.name || p.title || `Project #${p.id}`,
          })),
        );
      },
      error: (err: any) => console.error("Failed to load projects:", err),
    });

    this.http.post<any>(`${API_BASE_URL}/users/findall`, body).subscribe({
      next: (res: any) => {
        const items = Array.isArray(res)
          ? res
          : res?.data || res?.items || res?.result || res?.data?.data || [];
        
        const validWorkers = items.filter(
          (u: any) => Number(u.role) !== 1 && Number(u.role) !== 2
        );

        this.users.set(
          validWorkers.map((u: any) => ({
            id: u.id,
            name: u.name || u.username || u.full_name || `User #${u.id}`,
          })),
        );
      },
      error: (err: any) => console.error("Failed to load users:", err),
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.submitting.set(true);
    const formValue = this.form.getRawValue();

    const payload = {
      title: formValue.title,
      project_id: Number(formValue.project_id),
      worker_user_id: Number(formValue.worker_user_id),
      due_date: new Date(formValue.due_date).toISOString(),
    };

    const headers = new HttpHeaders({ user_id: "1" });

    this.http.post(`${API_BASE_URL}/tasks/create`, payload, { headers }).subscribe({
      next: () => {
        this.submitting.set(false);
        this.notifications.success("Task created successfully", formValue.title);
        this.saved.emit();
        this.close.emit();
      },
      error: (err: any) => {
        this.submitting.set(false);
        const serverMessage = Array.isArray(err?.error?.message)
          ? err.error.message.join(", ")
          : err?.error?.message || "Failed to create task";
        this.notifications.error(serverMessage, "Error");
      },
    });
  }
}