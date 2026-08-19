import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
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
import { PageResponse, Task } from "../../core/models";
import { TaskStatusBadgeComponent } from "../../shared/task-status-badge.component";

const EMPTY_PAGE: PageResponse<Task> = {
  data: [],
  paginationinfo: { total: 0, page: 1, limit: 10, totalPages: 0 },
};

@Component({
  selector: "app-task-list",
  imports: [FormsModule, DatePipe, TaskStatusBadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="space-y-6">
      <div>
        <p class="eyebrow">Tasks</p>
        <h1 class="page-title">All tasks</h1>
      </div>
      <article class="panel overflow-hidden">
        <div
          class="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 dark:border-slate-800 sm:flex-row sm:items-center"
        >
          <div>
            <h2>Task directory</h2>
            <p>Searches are sent in the JSON POST body.</p>
          </div>
          <label class="relative block sm:w-80"
            ><span class="sr-only">Search task titles</span
            ><input
              class="input"
              type="search"
              placeholder="Search task titles…"
              [ngModel]="search()"
              (ngModelChange)="search.set($event)"
          /></label>
        </div>
        @if (error()) {
          <div class="notice notice-error mt-5">{{ error() }}</div>
        }
        <div class="mt-5 overflow-x-auto">
          <table class="w-full min-w-[42.5rem] text-left text-sm">
            <thead>
              <tr
                class="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 dark:border-slate-800"
              >
                <th class="px-3 py-3 font-semibold">Task</th>
                <th class="px-3 py-3 font-semibold">Status</th>
                <th class="px-3 py-3 font-semibold">Due date</th>
                <th class="px-3 py-3 font-semibold">Project</th>
                <th class="px-3 py-3 font-semibold">Assignee</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
              @for (task of page().data; track task.id) {
                <tr>
                  <td class="px-3 py-4 font-medium">{{ task.title }}</td>
                  <td class="px-3 py-4">
                    <app-task-status-badge [status]="task.status" />
                  </td>
                  <td class="px-3 py-4 text-slate-600 dark:text-slate-300">
                    {{ task.due_date | date: "MMM d, y" }}
                  </td>
                  <td class="px-3 py-4 text-slate-600 dark:text-slate-300">
                    #{{ task.project_id }}
                  </td>
                  <td class="px-3 py-4 text-slate-600 dark:text-slate-300">
                    #{{ task.worker_user_id }}
                  </td>
                </tr>
              } @empty {
                <tr>
                  <td class="px-3 py-12 text-center text-slate-500" colspan="5">
                    {{
                      loading()
                        ? "Loading tasks…"
                        : "No tasks match this search."
                    }}
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <footer
          class="mt-5 flex items-center justify-between border-t border-slate-200 pt-5 text-sm dark:border-slate-800"
        >
          <p class="text-slate-500">
            {{ page().paginationinfo.total }} tasks · Page
            {{ page().paginationinfo.page }} of {{ maxPages() }}
          </p>
          <div class="flex gap-2">
            <button
              class="button-secondary"
              (click)="previousPage()"
              [disabled]="pageNumber() === 1 || loading()"
            >
              Previous</button
            ><button
              class="button-secondary"
              (click)="nextPage()"
              [disabled]="pageNumber() >= maxPages() || loading()"
            >
              Next
            </button>
          </div>
        </footer>
      </article>
    </section>
  `,
})
export class TaskListComponent {
  private readonly tasks = inject(TaskService);
  private readonly destroyRef = inject(DestroyRef);
  readonly search = signal("");
  readonly pageNumber = signal(1);
  readonly page = signal<PageResponse<Task>>(EMPTY_PAGE);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly maxPages = () => Math.max(1, this.page().paginationinfo.totalPages);

  constructor() {
    toObservable(this.search)
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        tap(() => this.pageNumber.set(1)),
        switchMap(() => this.fetch()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
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
    return this.tasks
      .findAll(this.search().trim(), { page: this.pageNumber(), limit: 10 })
      .pipe(
        tap((response) => {
          this.page.set(response);
          this.loading.set(false);
        }),
        catchError(() => {
          this.page.set(EMPTY_PAGE);
          this.error.set(
            "Could not load tasks. Check that the API is running.",
          );
          this.loading.set(false);
          return of(EMPTY_PAGE);
        }),
      );
  }
}
