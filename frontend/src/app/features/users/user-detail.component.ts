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

interface UserProfile {
  id: number;
  name: string;
  role?: number;
  [key: string]: any;
}

const API_BASE_URL = "https://nestjstask-1.onrender.com";

@Component({
  selector: "app-user-detail",
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page-container flex flex-col h-full py-8 max-w-4xl mx-auto px-4">
      <div class="mb-6">
        <a
          routerLink="/users"
          class="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          Back to Users
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
          <h2 class="text-lg font-semibold text-rose-700 dark:text-rose-400 mb-2">Failed to load user</h2>
          <p class="text-sm text-rose-600 dark:text-rose-300 mb-4">{{ error() }}</p>
          <button class="btn btn-secondary" routerLink="/users">Return to Users</button>
        </div>
      } @else if (user(); as u) {
        <div class="card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
          <div class="px-6 py-6 sm:px-8 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 mb-2">
                User ID: #{{ u.id }}
              </span>
              <h1 class="text-2xl font-bold text-slate-900 dark:text-white">{{ u.name }}</h1>
            </div>
          </div>

          <div class="px-6 py-6 sm:px-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            @for (key of objectKeys(u); track key) {
              @if (key !== 'id' && key !== 'name') {
                <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <span class="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-1">{{ key }}</span>
                  <span class="text-base font-semibold text-slate-800 dark:text-slate-200">
                    @if (key === 'role') {
                      <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold"
                        [ngClass]="{
                          'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300': u[key] === 1,
                          'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300': u[key] === 2,
                          'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300': (u[key] ?? 0) > 2
                        }">
                        Role Level {{ u[key] }}
                      </span>
                    } @else {
                      {{ u[key] !== null ? u[key] : 'N/A' }}
                    }
                  </span>
                </div>
              }
            }
          </div>
        </div>
      }
    </div>
  `,
})
export class UserDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly user = signal<UserProfile | null>(null);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get("id");
    if (idParam) {
      this.fetchUser(Number(idParam));
    } else {
      this.error.set("Invalid user ID provided.");
      this.loading.set(false);
    }
  }

  objectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  private fetchUser(id: number): void {
    this.loading.set(true);
    this.error.set(null);
    const adminHeaders = new HttpHeaders({ user_id: "1" });

    this.http
      .post<any>(`${API_BASE_URL}/users/findone`, { id }, { headers: adminHeaders })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((err) => {
          console.error("Error fetching user detail:", err);
          return of({ error: err });
        }),
      )
      .subscribe({
        next: (res) => {
          this.loading.set(false);
          if (res && !res.error) {
            this.user.set(res.data || res);
          } else {
            this.error.set("Could not retrieve user information.");
          }
        },
        error: () => {
          this.loading.set(false);
          this.error.set("An unexpected error occurred.");
        },
      });
  }
}