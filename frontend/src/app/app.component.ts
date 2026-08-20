import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { AuthService } from "./core/auth.service";
import { ToastContainerComponent } from "./shared/components/toast-container.component";

@Component({
  selector: "app-root",
  imports: [RouterLink, RouterLinkActive, RouterOutlet, ToastContainerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-toast-container />
    <div class="flex h-screen w-full overflow-hidden bg-slate-50 dark:bg-[#09090b]">
      
      <!-- Sidebar -->
      <aside class="flex w-64 flex-col border-r border-slate-200/60 bg-white/70 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/40">
        <div class="flex h-16 flex-shrink-0 items-center px-6">
          <a class="flex items-center gap-3" routerLink="/tasks">
            <div class="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 font-bold text-white shadow-lg shadow-brand-500/25">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            </div>
            <span class="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-white">Astro<span class="text-brand-500">Dash</span></span>
          </a>
        </div>
        
        <nav class="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
          <a class="nav-item group" routerLink="/tasks" routerLinkActive="nav-item-active">
            <svg class="mr-3 h-5 w-5 opacity-70 group-[.nav-item-active]:opacity-100" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
            Tasks
          </a>
          <a class="nav-item group" routerLink="/projects" routerLinkActive="nav-item-active">
            <svg class="mr-3 h-5 w-5 opacity-70 group-[.nav-item-active]:opacity-100" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            Projects
          </a>
          <a class="nav-item group" routerLink="/organizations" routerLinkActive="nav-item-active">
            <svg class="mr-3 h-5 w-5 opacity-70 group-[.nav-item-active]:opacity-100" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M9 8h1"/><path d="M9 12h1"/><path d="M9 16h1"/><path d="M14 8h1"/><path d="M14 12h1"/><path d="M14 16h1"/><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/></svg>
            Organizations
          </a>
          <a class="nav-item group" routerLink="/users" routerLinkActive="nav-item-active">
            <svg class="mr-3 h-5 w-5 opacity-70 group-[.nav-item-active]:opacity-100" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Users
          </a>
          <a class="nav-item group" routerLink="/statistics" routerLinkActive="nav-item-active">
            <svg class="mr-3 h-5 w-5 opacity-70 group-[.nav-item-active]:opacity-100" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
            Statistics
          </a>
        </nav>
        
        <div class="p-4">
          <div class="rounded-xl border border-brand-200 bg-brand-50/50 p-4 dark:border-brand-900/50 dark:bg-brand-950/20">
            <h4 class="font-display font-semibold text-brand-900 dark:text-brand-100">API Testing Mode</h4>
            <p class="mt-1 text-xs text-brand-700 dark:text-brand-300">All data operations are simulated directly via POST body.</p>
          </div>
        </div>
      </aside>

      <!-- Main Content Area -->
      <div class="flex flex-1 flex-col overflow-hidden">
        
        <!-- Top Header -->
        <header class="flex h-16 flex-shrink-0 items-center justify-between border-b border-slate-200/60 bg-white/70 px-6 backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/40">
          <div class="flex flex-1">
            <!-- Breadcrumbs / Page Title space -->
          </div>
          
          <div class="flex items-center gap-4">
            
            <div class="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <span class="text-xs font-medium text-slate-500 dark:text-slate-400">User ID:</span>
              <input
                class="w-12 bg-transparent text-center text-sm font-semibold text-slate-900 outline-none dark:text-slate-100"
                type="number"
                min="1"
                placeholder="ID"
                [value]="userInput()"
                (input)="setUserId($any($event.target).value)" 
              />
              <div class="h-4 w-px bg-slate-200 dark:bg-slate-700"></div>
              <button 
                class="flex items-center gap-1.5 text-xs font-semibold"
                [class.text-brand-600]="!tokenLoading() && auth.accessToken()"
                [class.dark:text-brand-400]="!tokenLoading() && auth.accessToken()"
                [class.text-slate-500]="tokenLoading() || !auth.accessToken()"
                (click)="getToken()"
                [disabled]="tokenLoading()"
              >
                @if (tokenLoading()) {
                  <svg class="h-3 w-3 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  <span>Syncing</span>
                } @else if (auth.accessToken()) {
                  <div class="size-1.5 rounded-full bg-brand-500"></div>
                  <span>Ready</span>
                } @else {
                  <span>Set JWT</span>
                }
              </button>
            </div>
            
            <button class="flex size-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100" (click)="toggleTheme()">
              @if (dark()) {
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
              } @else {
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
              }
            </button>
          </div>
        </header>

        <!-- Main Router Outlet -->
        <main class="flex-1 overflow-y-auto">
          <router-outlet />
        </main>
        
      </div>
    </div>
  `
})
export class AppComponent {
  readonly auth = inject(AuthService);
  readonly userInput = signal(this.auth.getUserId()?.toString() ?? "");
  readonly dark = signal(document.documentElement.classList.contains("dark"));
  readonly tokenLoading = signal(false);
  
  setUserId(value: string): void {
    this.userInput.set(value);
    const id = Number(value);
    if (Number.isInteger(id) && id > 0) {
      this.auth.setUserId(id);
      this.getToken(); // Auto-fetch token on ID change for better UX
    } else {
      this.auth.clearUserId();
    }
  }
  
  toggleTheme(): void {
    this.dark.update((isDark) => !isDark);
    document.documentElement.classList.toggle("dark", this.dark());
  }
  
  getToken(): void {
    this.tokenLoading.set(true);
    this.auth.requestDevelopmentToken().subscribe({
      error: () => this.tokenLoading.set(false),
      complete: () => this.tokenLoading.set(false),
    });
  }
}
