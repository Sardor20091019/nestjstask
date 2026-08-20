import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
  computed,
} from "@angular/core";
import { DatePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { takeUntilDestroyed, toObservable } from "@angular/core/rxjs-interop";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  of,
  switchMap,
  tap,
} from "rxjs";
import { TaskService } from "../../core/task.service";
import { PageResponse, Task, TaskStatus } from "../../core/models";
import { TaskStatusBadgeComponent } from "../../shared/task-status-badge.component";
import { TaskDrawerComponent } from "./task-drawer.component";

const EMPTY_PAGE: PageResponse<Task> = {
  data: [],
  paginationinfo: { total: 0, page: 1, limit: 10, totalPages: 0 },
};

@Component({
  selector: "app-task-list",
  imports: [
    FormsModule,
    DatePipe,
    TaskStatusBadgeComponent,
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
          <p class="page-subtitle">
            Manage and track your organization's work.
          </p>
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

        <!-- Status Dropdown (Simulated via Select) -->
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

        <!-- Priority Chips (Mocked Visuals) -->
        <div
          class="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 ml-auto opacity-70 cursor-not-allowed"
          title="Priority sorting is simulated"
        >
          <span
            class="text-xs font-semibold text-slate-500 pl-2 pr-1 uppercase tracking-wider"
            >Priority:</span
          >
          <button
            class="px-3 py-1 rounded-lg text-sm font-medium bg-white shadow-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
            disabled
          >
            All
          </button>
          <button
            class="px-3 py-1 rounded-lg text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400"
            disabled
          >
            High
          </button>
          <button
            class="px-3 py-1 rounded-lg text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400"
            disabled
          >
            Low
          </button>
        </div>
      </div>

      <!-- Main Content -->
      <div class="card flex-1 flex flex-col min-h-0 overflow-hidden mt-6">
        @if (error()) {
          <div
            class="p-4 border-b border-slate-200/60 dark:border-slate-800/60"
          >
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
                <th class="px-6 py-4 font-semibold">Status</th>
                <th class="px-6 py-4 font-semibold">Due Date</th>
                <th class="px-6 py-4 font-semibold">Project</th>
                <th class="px-6 py-4 font-semibold text-right">Assignee</th>
              </tr>
            </thead>

            <tbody
              class="divide-y divide-slate-100/80 dark:divide-slate-800/80"
            >
              @if (loading()) {
                @for (i of [1, 2, 3, 4, 5]; track i) {
                  <tr
                    class="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors"
                  >
                    <td class="px-6 py-4">
                      <div class="skeleton h-5 w-48"></div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="skeleton h-6 w-24 rounded-full"></div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="skeleton h-5 w-24"></div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="skeleton h-5 w-16"></div>
                    </td>
                    <td class="px-6 py-4 text-right">
                      <div class="skeleton h-8 w-8 rounded-full ml-auto"></div>
                    </td>
                  </tr>
                }
              } @else {
                @for (task of page().data; track task.id) {
                  <tr
                    class="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors cursor-pointer"
                  >
                    <td class="px-6 py-4">
                      <div
                        class="font-medium text-slate-900 dark:text-slate-100"
                      >
                        {{ task.title }}
                      </div>
                      <div class="text-xs text-slate-500 mt-0.5">
                        ID: #{{ task.id }}
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <app-task-status-badge [status]="task.status" />
                    </td>
                    <td class="px-6 py-4">
                      <div
                        class="flex items-center gap-1.5 text-slate-600 dark:text-slate-400"
                      >
                        <svg
                          class="h-4 w-4 opacity-70"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <rect
                            width="18"
                            height="18"
                            x="3"
                            y="4"
                            rx="2"
                            ry="2"
                          />
                          <line x1="16" x2="16" y1="2" y2="6" />
                          <line x1="8" x2="8" y1="2" y2="6" />
                          <line x1="3" x2="21" y1="10" y2="10" />
                        </svg>
                        {{ task.due_date | date: "MMM d, y" }}
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <span
                        class="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400 ring-1 ring-inset ring-slate-500/10 dark:ring-slate-400/20"
                      >
                        Project #{{ task.project_id }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-right">
                      <div
                        class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-100 to-brand-200 text-brand-700 ring-2 ring-white dark:from-brand-900 dark:to-brand-800 dark:text-brand-300 dark:ring-slate-900 font-bold text-xs shadow-sm"
                      >
                        {{ task.worker_user_id }}
                      </div>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="5" class="px-6 py-16 text-center">
                      <div class="flex flex-col items-center justify-center">
                        <div
                          class="rounded-full bg-slate-100 dark:bg-slate-800 p-4 mb-4"
                        >
                          <svg
                            class="h-8 w-8 text-slate-400"
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
                        </div>
                        <h3
                          class="text-sm font-semibold text-slate-900 dark:text-slate-100"
                        >
                          No tasks found
                        </h3>
                        <p
                          class="mt-1 text-sm text-slate-500 dark:text-slate-400"
                        >
                          Try adjusting your search filters or create a new
                          task.
                        </p>
                      </div>
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
          <p class="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Showing page
            <span class="text-slate-900 dark:text-slate-200">{{
              page().paginationinfo.page
            }}</span>
            of
            <span class="text-slate-900 dark:text-slate-200">{{
              maxPages()
            }}</span>
            <span class="mx-2 text-slate-300 dark:text-slate-700">|</span>
            <span class="text-slate-900 dark:text-slate-200">{{
              page().paginationinfo.total
            }}</span>
            total tasks
          </p>
          <div class="flex gap-2">
            <button
              class="btn btn-secondary btn-ghost"
              (click)="previousPage()"
              [disabled]="pageNumber() === 1 || loading()"
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
                <path d="m15 18-6-6 6-6" />
              </svg>
              Prev
            </button>
            <button
              class="btn btn-secondary btn-ghost"
              (click)="nextPage()"
              [disabled]="pageNumber() >= maxPages() || loading()"
            >
              Next
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
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class TaskListComponent {
  private readonly tasks = inject(TaskService);
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
          (prev, curr) =>
            prev.search === curr.search && prev.status === curr.status,
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

  private fetch() {
    this.loading.set(true);
    this.error.set(null);

    const filters = this.filterState();
    const options: any = { page: this.pageNumber(), limit: 10 };
    if (filters.status) {
      options.status = [filters.status];
    }

    return this.tasks.findAll(filters.search.trim(), options).pipe(
      tap((response) => {
        this.page.set(response);
        this.loading.set(false);
      }),
      catchError(() => {
        this.page.set(EMPTY_PAGE);
        this.error.set("Could not load tasks. Check that the API is running.");
        this.loading.set(false);
        return of(EMPTY_PAGE);
      }),
    );
  }
}
