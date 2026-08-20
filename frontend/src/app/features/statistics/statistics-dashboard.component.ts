import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { catchError, forkJoin, of } from "rxjs";
import {
  StatisticsService,
  OverallStatistics,
  OrganizationStatistics,
  ProjectTaskStatistics,
} from "../../core/statistics.service";
import { UserService } from "../../core/user.service";
import { ProjectService } from "../../core/project.service";
import { TaskService } from "../../core/task.service";

@Component({
  selector: "app-statistics-dashboard",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page-container flex flex-col h-full py-8">
      <!-- Header Section -->
      <div
        class="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1
            class="page-title text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Executive Summary
          </h1>
          <p class="page-subtitle text-sm text-slate-500 dark:text-slate-400">
            Real-time statistics and analytics for your workspace.
          </p>
        </div>
        <div class="flex items-center gap-2">
          <button
            class="btn btn-secondary btn-ghost inline-flex items-center gap-2"
            (click)="exportData()"
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
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            Export
          </button>
          <button
            class="btn btn-primary shadow-brand-500/25 inline-flex items-center gap-2"
            (click)="refreshData()"
            [disabled]="loading()"
          >
            <svg
              class="h-4 w-4"
              [class.animate-spin]="loading()"
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
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      <!-- Main Content -->
      <div class="mt-8 space-y-6">
        <!-- Top KPI Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          @if (loading()) {
            @for (i of [1, 2, 3, 4]; track i) {
              <div
                class="card p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs"
              >
                <div class="skeleton h-4 w-1/3 mb-4 rounded-md"></div>
                <div class="skeleton h-8 w-1/2 mb-2 rounded-md"></div>
                <div class="skeleton h-3 w-2/3 rounded-md"></div>
              </div>
            }
          } @else {
            <div
              class="card p-5 relative overflow-hidden group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs transition-all hover:shadow-md"
            >
              <div
                class="absolute -right-4 -top-4 text-brand-500/5 group-hover:text-brand-500/10 transition-colors pointer-events-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <p
                class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1"
              >
                Total Organizations
              </p>
              <h3
                class="text-3xl font-display font-bold text-slate-900 dark:text-white"
              >
                {{ totalOrganizations() | number }}
              </h3>
              <div class="mt-2 flex items-center text-xs">
                <span class="text-emerald-500 font-medium flex items-center">
                  <svg
                    class="mr-1 h-3 w-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                  </svg>
                  Active
                </span>
                <span class="text-slate-400 ml-2">workspace entities</span>
              </div>
            </div>

            <div
              class="card p-5 relative overflow-hidden group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs transition-all hover:shadow-md"
            >
              <div
                class="absolute -right-4 -top-4 text-brand-500/5 group-hover:text-brand-500/10 transition-colors pointer-events-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
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
              <p
                class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1"
              >
                Total Projects
              </p>
              <h3
                class="text-3xl font-display font-bold text-slate-900 dark:text-white"
              >
                {{ totalProjects() | number }}
              </h3>
              <div class="mt-2 flex items-center text-xs">
                <span class="text-emerald-500 font-medium flex items-center">
                  <svg
                    class="mr-1 h-3 w-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                  </svg>
                  Managed
                </span>
                <span class="text-slate-400 ml-2">across all orgs</span>
              </div>
            </div>

            <div
              class="card p-5 relative overflow-hidden group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs transition-all hover:shadow-md"
            >
              <div
                class="absolute -right-4 -top-4 text-brand-500/5 group-hover:text-brand-500/10 transition-colors pointer-events-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
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
              <p
                class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1"
              >
                Total Tasks
              </p>
              <h3
                class="text-3xl font-display font-bold text-slate-900 dark:text-white"
              >
                {{ totalTasks() | number }}
              </h3>
              <div class="mt-2 flex items-center text-xs">
                <span class="text-emerald-500 font-medium flex items-center">
                  <svg
                    class="mr-1 h-3 w-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                  </svg>
                  Tracked
                </span>
                <span class="text-slate-400 ml-2">system-wide</span>
              </div>
            </div>

            <div
              class="card p-5 relative overflow-hidden group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs transition-all hover:shadow-md"
            >
              <div
                class="absolute -right-4 -top-4 text-brand-500/5 group-hover:text-brand-500/10 transition-colors pointer-events-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M2 12h20" />
                  <path d="M12 2v20" />
                  <path d="m4.93 4.93 14.14 14.14" />
                  <path d="m4.93 19.07 14.14-14.14" />
                </svg>
              </div>
              <p
                class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1"
              >
                Total Users
              </p>
              <h3
                class="text-3xl font-display font-bold text-slate-900 dark:text-white"
              >
                {{ totalUsers() | number }}
              </h3>
              <div class="mt-2 flex items-center text-xs">
                <span class="text-emerald-500 font-medium flex items-center">
                  <svg
                    class="mr-1 h-3 w-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                  </svg>
                  Registered
                </span>
                <span class="text-slate-400 ml-2">accounts</span>
              </div>
            </div>
          }
        </div>

        <!-- Detailed Breakdowns Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Organization Analytics -->
          <div
            class="card p-6 flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs"
          >
            <h2
              class="text-base font-semibold text-slate-900 dark:text-slate-100 mb-4"
            >
              Organizations Overview
            </h2>
            @if (orgStats().length > 0) {
              <div class="space-y-3">
                @for (stat of orgStats(); track stat.organization_name) {
                  <div
                    class="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800"
                  >
                    <div>
                      <p
                        class="font-medium text-sm text-slate-900 dark:text-slate-100"
                      >
                        {{ stat.organization_name }}
                      </p>
                      <p class="text-xs text-slate-400">
                        {{ stat.projects_count }} projects
                      </p>
                    </div>
                    <div class="text-right">
                      <span
                        class="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950/50 dark:text-brand-300"
                      >
                        {{ stat.total_tasks }} tasks
                      </span>
                    </div>
                  </div>
                }
              </div>
            } @else {
              <div
                class="flex-1 flex items-center justify-center py-12 text-slate-400 text-sm"
              >
                No organization statistics available.
              </div>
            }
          </div>

          <!-- Project Tasks Analytics -->
          <div
            class="card p-6 flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs"
          >
            <h2
              class="text-base font-semibold text-slate-900 dark:text-slate-100 mb-4"
            >
              Project Tasks Breakdown
            </h2>
            @if (taskStats().length > 0) {
              <div class="space-y-3 max-h-[300px] overflow-y-auto">
                @for (stat of taskStats(); track stat.project_name) {
                  <div
                    class="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800"
                  >
                    <div>
                      <p
                        class="font-medium text-sm text-slate-900 dark:text-slate-100"
                      >
                        {{ stat.project_name }}
                      </p>
                      <p class="text-xs text-slate-400">
                        {{ stat.organization_name }}
                      </p>
                    </div>
                    <div class="text-right">
                      <span
                        class="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
                      >
                        {{ stat.project_tasks_count }} tasks
                      </span>
                    </div>
                  </div>
                }
              </div>
            } @else {
              <div
                class="flex-1 flex items-center justify-center py-12 text-slate-400 text-sm"
              >
                No project task statistics available.
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
})
export class StatisticsDashboardComponent implements OnInit {
  private readonly statsService = inject(StatisticsService);
  private readonly userService = inject(UserService);
  private readonly destroyRef = inject(DestroyRef);

  readonly loading = signal(true);

  // Metrics
  readonly totalOrganizations = signal(0);
  readonly totalProjects = signal(0);
  readonly totalTasks = signal(0);
  readonly totalUsers = signal(0);

  readonly orgStats = signal<OrganizationStatistics[]>([]);
  readonly taskStats = signal<ProjectTaskStatistics[]>([]);

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.loading.set(true);

    forkJoin({
      overall: this.statsService.overall().pipe(catchError(() => of(null))),
      orgs: this.statsService.organizations().pipe(catchError(() => of([]))),
      tasks: this.statsService.tasks().pipe(catchError(() => of([]))),
      users: this.userService
        .findAll("", { page: 1, limit: 1 })
        .pipe(catchError(() => of(null))),
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res.overall) {
            this.totalOrganizations.set(res.overall.total_organizations || 0);
            this.totalProjects.set(res.overall.total_projects || 0);
            this.totalTasks.set(res.overall.total_tasks || 0);
          }
          if (res.orgs && Array.isArray(res.orgs)) {
            this.orgStats.set(res.orgs);
          }
          if (res.tasks && Array.isArray(res.tasks)) {
            this.taskStats.set(res.tasks);
          }
          if (res.users) {
            const userCount =
              res.users.paginationinfo?.total || res.users.data?.length || 1;
            this.totalUsers.set(userCount);
          }
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
        },
      });
  }

  refreshData(): void {
    this.loadStatistics();
  }

  exportData(): void {
    const data = {
      overall: {
        organizations: this.totalOrganizations(),
        projects: this.totalProjects(),
        tasks: this.totalTasks(),
        users: this.totalUsers(),
      },
      organizations: this.orgStats(),
      projectTasks: this.taskStats(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "astrodash-executive-summary.json";
    a.click();
    URL.revokeObjectURL(url);
  }
}
