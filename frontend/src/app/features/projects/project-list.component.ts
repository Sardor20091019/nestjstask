import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { catchError, of } from "rxjs";

interface Project {
  id: number;
  name: string;
  org_id?: number;
  created_by?: number;
  taskCount?: number;
}

@Component({
  selector: "app-project-list",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page-container flex flex-col h-full py-8 relative">
      <!-- Header Section -->
      <div
        class="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1
            class="page-title text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Projects
          </h1>
          <p class="page-subtitle text-sm text-slate-500 dark:text-slate-400">
            Manage and track your organization's work.
          </p>
        </div>
        <button
          class="btn btn-primary shadow-brand-500/25 inline-flex items-center gap-2"
          (click)="openCreateModal()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          <span class="hidden sm:inline">New Project</span>
        </button>
      </div>

      <!-- Main Content -->
      <div class="flex-1 mt-8">
        @if (loading()) {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (i of [1, 2, 3, 4, 5, 6]; track i) {
              <div
                class="card p-6 min-h-[160px] flex flex-col gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs"
              >
                <div class="flex items-start justify-between">
                  <div class="skeleton h-6 w-1/2 rounded-md"></div>
                  <div class="skeleton h-8 w-8 rounded-full"></div>
                </div>
                <div class="skeleton h-4 w-3/4 rounded-md"></div>
                <div class="mt-auto flex justify-between items-center">
                  <div class="skeleton h-4 w-1/4 rounded-md"></div>
                  <div class="skeleton h-8 w-20 rounded-lg"></div>
                </div>
              </div>
            }
          </div>
        } @else if (projects().length > 0) {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (project of projects(); track project.id) {
              <div
                class="card p-6 card-hover cursor-pointer flex flex-col group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs transition-all hover:shadow-md"
              >
                <div class="flex items-start justify-between mb-4">
                  <div>
                    <span
                      class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mb-1.5"
                    >
                      ID: #{{ project.id }}
                    </span>
                    <h3
                      class="text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors"
                    >
                      {{ project.name }}
                    </h3>
                  </div>
                  <div
                    class="p-2 bg-brand-50 dark:bg-brand-950/30 text-brand-600 dark:text-brand-400 rounded-xl"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  </div>
                </div>

                <div
                  class="text-xs text-slate-500 dark:text-slate-400 space-y-1 mb-4"
                >
                  <p>Org ID: {{ project.org_id || 1 }}</p>
                  <p>Created By: {{ project.created_by || 1 }}</p>
                </div>

                <div
                  class="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between"
                >
                  <div
                    class="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400"
                  >
                    <svg
                      class="h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                      />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    {{ project.taskCount || 0 }} tasks
                  </div>
                  <span
                    class="text-brand-600 dark:text-brand-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    View details &rarr;
                  </span>
                </div>
              </div>
            }
          </div>
        } @else {
          <!-- Empty State -->
          <div
            class="card flex flex-col items-center justify-center p-16 text-center max-w-2xl mx-auto mt-12 border-dashed bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs"
          >
            <div
              class="rounded-full bg-brand-50 dark:bg-brand-950/40 p-6 mb-6 text-brand-500"
            >
              <svg
                class="h-12 w-12"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <h2
              class="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2"
            >
              No projects found
            </h2>
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-8 max-w-md">
              Get started by creating a new project.
            </p>
            <button
              class="btn btn-primary shadow-brand-500/25 px-6 py-2.5 inline-flex items-center gap-2"
              (click)="openCreateModal()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              Create New Project
            </button>
          </div>
        }
      </div>

      <!-- Create Project Slide-over Drawer -->
      @if (isDrawerOpen()) {
        <div
          class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity"
          (click)="closeDrawer()"
        ></div>

        <div
          class="fixed inset-y-0 right-0 z-50 w-full max-w-md transform bg-white shadow-2xl transition-transform duration-300 ease-in-out dark:bg-slate-900 flex flex-col"
        >
          <div
            class="px-6 py-6 sm:px-8 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between"
          >
            <div>
              <h2 class="text-lg font-semibold text-slate-900 dark:text-white">
                Create New Project
              </h2>
              <p class="text-sm text-slate-500 dark:text-slate-400">
                Set up a new workspace for your team.
              </p>
            </div>
            <button
              type="button"
              class="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"
              (click)="closeDrawer()"
            >
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

          <div class="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
            <form
              [formGroup]="form"
              id="project-form"
              (ngSubmit)="submitProject()"
              class="space-y-6"
            >
              <div>
                <label
                  for="name"
                  class="label text-sm font-medium text-slate-700 dark:text-slate-300"
                  >Project Name <span class="text-rose-500">*</span></label
                >
                <input
                  type="text"
                  id="name"
                  formControlName="name"
                  class="input mt-1.5 w-full"
                  placeholder="e.g. Website Revamp"
                />
                @if (
                  form.controls.name.touched &&
                  form.controls.name.errors?.["required"]
                ) {
                  <p class="mt-1 text-xs text-rose-500">
                    Project name is required.
                  </p>
                }
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label
                    for="org_id"
                    class="label text-sm font-medium text-slate-700 dark:text-slate-300"
                    >Org ID <span class="text-rose-500">*</span></label
                  >
                  <input
                    type="number"
                    id="org_id"
                    formControlName="org_id"
                    class="input mt-1.5 w-full"
                  />
                </div>
                <div>
                  <label
                    for="created_by"
                    class="label text-sm font-medium text-slate-700 dark:text-slate-300"
                    >Created By <span class="text-rose-500">*</span></label
                  >
                  <input
                    type="number"
                    id="created_by"
                    formControlName="created_by"
                    class="input mt-1.5 w-full"
                  />
                </div>
              </div>
            </form>
          </div>

          <div
            class="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-end gap-3"
          >
            <button
              type="button"
              class="btn btn-secondary"
              (click)="closeDrawer()"
              [disabled]="submitting()"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="project-form"
              class="btn btn-primary"
              [disabled]="form.invalid || submitting()"
            >
              @if (submitting()) {
                Creating...
              } @else {
                Create Project
              }
            </button>
          </div>
        </div>
      }
    </div>
  `,
})
export class ProjectListComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(NonNullableFormBuilder);

  readonly loading = signal(true);
  readonly submitting = signal(false);
  readonly isDrawerOpen = signal(false);
  readonly projects = signal<Project[]>([]);

  readonly form = this.fb.group({
    name: ["", Validators.required],
    org_id: [1, Validators.required],
    created_by: [1, Validators.required],
  });

  ngOnInit(): void {
    this.fetchProjects();
  }

  private fetchProjects(): void {
    this.loading.set(true);

    this.http
      .post<any>("/projects/findAll", { limit: 20 })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError(() => of(null)),
      )
      .subscribe({
        next: (res) => {
          const fetchedData = res?.data || res || [];
          this.projects.set(Array.isArray(fetchedData) ? fetchedData : []);
          this.loading.set(false);
        },
        error: () => {
          this.projects.set([]);
          this.loading.set(false);
        },
      });
  }

  openCreateModal(): void {
    this.form.reset({ name: "", org_id: 1, created_by: 1 });
    this.isDrawerOpen.set(true);
  }

  closeDrawer(): void {
    this.isDrawerOpen.set(false);
  }

  submitProject(): void {
    if (this.form.invalid) return;

    this.submitting.set(true);
    const raw = this.form.getRawValue();

    const payload = {
      name: raw.name,
      org_id: Number(raw.org_id),
      created_by: Number(raw.created_by),
    };

    this.http
      .post<any>("/projects/create", payload)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((err) => {
          console.error("Project creation error:", err);
          return of({ error: err });
        }),
      )
      .subscribe({
        next: (res) => {
          this.submitting.set(false);
          if (res && !res.error) {
            this.closeDrawer();
            this.fetchProjects();
          }
        },
      });
  }
}
