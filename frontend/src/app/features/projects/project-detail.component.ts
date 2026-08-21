import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { catchError, of } from "rxjs";

interface Project {
  id: number;
  name: string;
  org_id?: number;
  created_by?: number;
}

const API_BASE_URL = "https://nestjstask-1.onrender.com";

@Component({
  selector: "app-project-detail",
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page-container flex flex-col h-full py-8 max-w-4xl mx-auto px-4">
      <!-- Back Navigation -->
      <div class="mb-6">
        <a
          routerLink="/projects"
          class="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          Back to Projects
        </a>
      </div>

      @if (loading()) {
        <div class="card p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-6">
          <div class="skeleton h-8 w-1/3 rounded-md"></div>
          <div class="skeleton h-4 w-2/3 rounded-md"></div>
          <div class="skeleton h-20 w-full rounded-xl"></div>
        </div>
      } @else if (error()) {
        <div class="card p-8 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-2xl text-center">
          <h2 class="text-lg font-semibold text-rose-700 dark:text-rose-400 mb-2">Failed to load project</h2>
          <p class="text-sm text-rose-600 dark:text-rose-300 mb-4">{{ error() }}</p>
          <button class="btn btn-secondary" routerLink="/projects">Return to Projects</button>
        </div>
      } @else if (project(); as p) {
        <div class="card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
          <div class="px-6 py-6 sm:px-8 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 mb-2">
                Project ID: #{{ p.id }}
              </span>
              <h1 class="text-2xl font-bold text-slate-900 dark:text-white">{{ p.name }}</h1>
            </div>
          </div>

          <div class="px-6 py-6 sm:px-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span class="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-1">Organization ID</span>
              <span class="text-base font-semibold text-slate-800 dark:text-slate-200">{{ p.org_id || 'N/A' }}</span>
            </div>
            <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span class="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-1">Created By User ID</span>
              <span class="text-base font-semibold text-slate-800 dark:text-slate-200">{{ p.created_by || 'N/A' }}</span>
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class ProjectDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly project = signal<Project | null>(null);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get("id");
    if (idParam) {
      this.fetchProject(Number(idParam));
    } else {
      this.error.set("Invalid project ID provided.");
      this.loading.set(false);
    }
  }

  private fetchProject(id: number): void {
    this.loading.set(true);
    this.error.set(null);
    const adminHeaders = new HttpHeaders({ user_id: "1" });

    this.http
      .post<any>(`${API_BASE_URL}/projects/findone`, { id }, { headers: adminHeaders })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((err) => {
          console.error("Error fetching project detail:", err);
          return of({ error: err });
        }),
      )
      .subscribe({
        next: (res) => {
          this.loading.set(false);
          if (res && !res.error) {
            const data = res.data || res;
            this.project.set(data);
          } else {
            this.error.set("Could not retrieve project information.");
          }
        },
        error: () => {
          this.loading.set(false);
          this.error.set("An unexpected error occurred.");
        },
      });
  }
}