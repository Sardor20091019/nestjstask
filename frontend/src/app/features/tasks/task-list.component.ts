import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from "@angular/core";
import { DatePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { takeUntilDestroyed, toObservable } from "@angular/core/rxjs-interop";
import { catchError, debounceTime, distinctUntilChanged, of, switchMap, tap } from "rxjs";
import { TaskService } from "../../core/task.service";
import { PageResponse, Task } from "../../core/models";
import { TaskDrawerComponent } from "./task-drawer.component";

const EMPTY_PAGE: PageResponse<Task> = {
  data: [],
  paginationinfo: { total: 0, page: 1, limit: 10, totalPages: 0 },
};

@Component({
  selector: "app-task-list",
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    TaskDrawerComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-task-drawer
      [isOpen]="isDrawerOpen()"
      (close)="isDrawerOpen.set(false)"
      (saved)="refresh()"
    />

    <div class="page-container flex flex-col h-full py-8 relative">
      <!-- Header Section -->
      <div class="page-header">
        <div>
          <h1 class="page-title">Tasks</h1>
          <p class="page-subtitle">Manage and track your organization's work.</p>
        </div>

        <div class="flex items-center gap-3">
          <button
            class="btn btn-primary shadow-brand-500/25"
            (click)="isDrawerOpen.set(true)"
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
            <span class="hidden sm:inline">New Task</span>
          </button>
        </div>
      </div>

      <!-- Human-Friendly Filter Bar -->
      <div class="mt-6 flex flex-col sm:flex-row flex-wrap items-center gap-3">
        <!-- Search Input -->
        <div class="relative w-full sm:w-72 shrink-0">
          <svg
            class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
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
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            class="input pl-9"
            type="search"
            placeholder="Search tasks..."
            [ngModel]="search()"
            (ngModelChange)="search.set($event)"
          />
        </div>

        <!-- Status Filter Dropdown -->
        <div class="w-full sm:w-48 shrink-0">
          <select
            class="input appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:16px_16px] bg-no-repeat bg-[position:right_12px_center]"
            [ngModel]="statusFilter()"
            (ngModelChange)="statusFilter.set($event)"
          >
            <option value="">All Statuses</option>
            <option value="CREATED">New</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Completed</option>
          </select>
        </div>
      </div>

      <!-- Main Content -->
      <div class="card flex-1 flex flex-col min-h-0 overflow-hidden mt-6">
        @if (error()) {
          <div class="p-4 border-b border-slate-200/60 dark:border-slate-800/60">
            <div class="notice notice-error">{{ error() }}</div>
          </div>
        }

        <div class="flex-1 overflow-auto">
          <table class="w-full text-left text-sm whitespace-nowrap">
            <thead
              class="sticky top-0 z-10 bg-white/90 backdrop-blur-md dark:bg-slate-900/90 shadow-sm border-b border-slate-200/60 dark:border-slate-800/60"
            >
              <tr
                class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
              >
                <th class="px-6 py-4 font-semibold">Task Title</th>
                <th class="px-6 py-4 font-semibold">Status (Change)</th>
                <th class="px-6 py-4 font-semibold">Due Date</th>
                <th class="px-6 py-4 font-semibold">Project</th>
                <th class="px-6 py-4 font-semibold">Assignee (Worker ID)</th>
                <th class="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-100/80 dark:divide-slate-800/80">
              @if (loading()) {
                @for (i of [1, 2, 3, 4, 5]; track i) {
                  <tr
                    class="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors"
                  >
                    <td class="px-6 py-4"><div class="skeleton h-5 w-48"></div></td>
                    <td class="px-6 py-4"><div class="skeleton h-6 w-28 rounded-md"></div></td>
                    <td class="px-6 py-4"><div class="skeleton h-5 w-24"></div></td>
                    <td class="px-6 py-4"><div class="skeleton h-5 w-16"></div></td>
                    <td class="px-6 py-4"><div class="skeleton h-8 w-8 rounded-full"></div></td>
                    <td class="px-6 py-4 text-right"><div class="skeleton h-8 w-8 rounded-xl ml-auto"></div></td>
                  </tr>
                }
              } @else {
                @for (task of page().data; track task.id) {
                  <tr
                    class="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors"
                  >
                    <td class="px-6 py-4">
                      <div class="font-medium text-slate-900 dark:text-slate-100">
                        {{ task.title }}
                      </div>
                      <div class="text-xs text-slate-500 mt-0.5">ID: #{{ task.id }}</div>
                    </td>
                    <td class="px-6 py-4">
                      <select
                        class="input text-xs py-1 px-2 w-36 bg-slate-50 dark:bg-slate-800"
                        [ngModel]="task.status"
                        (ngModelChange)="onStatusChange(task, $event)"
                      >
                        <option value="CREATED">New</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="DONE">Completed</option>
                      </select>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                        {{ task.due_date | date: "MMM d, y" }}
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <span
                        class="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                      >
                        Project #{{ task.project_id }}
                      </span>
                    </td>
                    <td class="px-6 py-4">
                      <div
                        class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-bold text-xs shadow-sm"
                      >
                        {{ task.worker_user_id }}
                      </div>
                    </td>
                    <td class="px-6 py-4 text-right">
                      <button
                        type="button"
                        class="p-2 text-slate-400 hover:text-rose-600 rounded-xl transition-colors"
                        (click)="removeTask(task.id)"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="6" class="px-6 py-16 text-center text-slate-500">
                      No tasks found
                    </td>
                  </tr>
                }
              }
            </tbody>
          </table>
        </div>

        <!-- Pagination Footer -->
        <div
          class="flex items-center justify-between border-t border-slate-200/60 bg-slate-50/50 px-6 py-4 dark:border-slate-800/60 dark:bg-slate-900/50"
        >
          <p class="text-sm text-slate-500 font-medium">
            Showing page {{ page().paginationinfo.page }} of {{ maxPages() }}
          </p>
          <div class="flex gap-2">
            <button
              class="btn btn-secondary btn-ghost"
              (click)="previousPage()"
              [disabled]="pageNumber() === 1 || loading()"
            >
              Prev
            </button>
            <button
              class="btn btn-secondary btn-ghost"
              (click)="nextPage()"
              [disabled]="pageNumber() >= maxPages() || loading()"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class TaskListComponent {
  private readonly taskService = inject(TaskService);
  private readonly destroyRef = inject(DestroyRef);

  readonly search = signal("");
  readonly statusFilter = signal("");
  readonly isDrawerOpen = signal(false);

  readonly pageNumber = signal(1);
  readonly page = signal<PageResponse<Task>>(EMPTY_PAGE);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly maxPages = () => Math.max(1, this.page().paginationinfo.totalPages);

  private readonly filterState = computed(() => ({
    search: this.search(),
    status: this.statusFilter(),
  }));

  constructor() {
    toObservable(this.filterState)
      .pipe(
        debounceTime(300),
        distinctUntilChanged(
          (prev, curr) => prev.search === curr.search && prev.status === curr.status,
        ),
        tap(() => this.pageNumber.set(1)),
        switchMap(() => this.fetch()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  refresh(): void {
    this.fetch().subscribe();
  }

  previousPage(): void {
    if (this.pageNumber() > 1) {
      this.pageNumber.update((page) => page - 1);
      this.fetch().subscribe();
    }
  }

  nextPage(): void {
    if (this.pageNumber() < this.maxPages()) {
      this.pageNumber.update((page) => page + 1);
      this.fetch().subscribe();
    }
  }

  onStatusChange(task: Task, newStatus: string): void {
    this.taskService
      .updateStatus({ id: task.id, status: newStatus, worker_user_id: task.worker_user_id } as any)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({ next: () => this.refresh() });
  }

  removeTask(id: number): void {
    this.taskService
      .remove({ id })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({ next: () => this.refresh() });
  }

  private fetch() {
    this.loading.set(true);
    this.error.set(null);

    const filters = this.filterState();
    const options: any = { page: this.pageNumber(), limit: 10 };
    if (filters.status) {
      options.status = [filters.status];
    }

    return this.taskService.findAll(filters.search.trim(), options).pipe(
      tap((response) => {
        this.page.set(response);
        this.loading.set(false);
      }),
      catchError(() => {
        this.page.set(EMPTY_PAGE);
        this.error.set("Could not load tasks.");
        this.loading.set(false);
        return of(EMPTY_PAGE);
      }),
    );
  }
}