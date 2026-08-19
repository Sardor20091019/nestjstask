import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { AuthService } from "./core/auth.service";

@Component({
  selector: "app-root",
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main
      class="min-h-screen bg-[radial-gradient(circle_at_top_left,_oklch(0.95_0.04_290),transparent_30rem)] text-slate-950 dark:bg-slate-950 dark:text-slate-50"
    >
      <header
        class="sticky top-0 z-20 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80"
      >
        <div
          class="mx-auto flex max-w-[90rem] flex-wrap items-center justify-between gap-4 px-5 py-4 lg:px-8"
        >
          <a class="flex items-center gap-3" routerLink="/tasks"
            ><span
              class="grid size-10 place-items-center rounded-xl bg-linear-to-br from-brand-500 to-fuchsia-600 font-black text-white shadow-lg shadow-violet-600/25 scale-73"
            >
              zo'rlogo
            </span>
            <span
              ><span class="block font-bold tracking-tight">AstroSpectrum</span
              ><span class="block text-xs text-slate-500">website</span></span
            ></a
          >
          <div class="flex items-center gap-3">
            <label
              class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"
              ><span class="hidden sm:inline">Acting as</span
              ><input
                class="w-20 rounded-lg border border-slate-300 bg-transparent px-2 py-1.5 text-center outline-none ring-brand-500 focus:ring-2 dark:border-slate-700"
                type="number"
                min="1"
                [value]="userInput()"
                (input)="setUserId($any($event.target).value)" /></label
            ><button class="button-secondary" (click)="toggleTheme()">
              {{ dark() ? "Light" : "Dark" }}
            </button>
          </div>
        </div>
      </header>
      <div
        class="mx-auto grid max-w-[90rem] gap-8 px-5 py-8 lg:grid-cols-[15rem_1fr] lg:px-8"
      >
        <nav class="sidebar-nav">
          <a
            class="nav-item"
            routerLink="/users"
            routerLinkActive="nav-item-active"
            >Users</a
          ><a
            class="nav-item"
            routerLink="/organizations"
            routerLinkActive="nav-item-active"
            >Organizations</a
          ><a
            class="nav-item"
            routerLink="/projects"
            routerLinkActive="nav-item-active"
            >Projects</a
          ><a
            class="nav-item"
            routerLink="/tasks"
            routerLinkActive="nav-item-active"
            >Tasks</a
          ><a
            class="nav-item"
            routerLink="/statistics"
            routerLinkActive="nav-item-active"
            >Statistics</a
          >
          <div
            class="mt-5 rounded-xl bg-slate-100 p-3 text-xs leading-5 text-slate-500 dark:bg-slate-900"
          >
            <strong class="block text-slate-700 dark:text-slate-200"
              >POST-only API</strong
            >
            All filters and pagination are sent as JSON request bodies.
          </div>
        </nav>
        <div><router-outlet /></div>
      </div>
    </main>
  `,
})
export class AppComponent {
  readonly auth = inject(AuthService);
  readonly userInput = signal(this.auth.getUserId()?.toString() ?? "");
  readonly dark = signal(document.documentElement.classList.contains("dark"));
  setUserId(value: string): void {
    this.userInput.set(value);
    const id = Number(value);
    if (Number.isInteger(id) && id > 0) this.auth.setUserId(id);
    else this.auth.clearUserId();
  }
  toggleTheme(): void {
    this.dark.update((isDark) => !isDark);
    document.documentElement.classList.toggle("dark", this.dark());
  }
}
