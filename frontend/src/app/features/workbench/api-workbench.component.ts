import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { JsonPipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { ApiService } from "../../core/api.service";

interface Operation {
  label: string;
  path: string;
  body: string;
  note?: string;
}
interface WorkbenchData {
  title: string;
  description: string;
  operations: Operation[];
  listPath?: string;
}

@Component({
  selector: "app-api-workbench",
  imports: [FormsModule, JsonPipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="space-y-6">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="eyebrow">API workspace</p>
          <h1 class="page-title">{{ data.title }}</h1>
          <p class="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            {{ data.description }}
          </p>
        </div>
        @if (data.listPath) {
          <a class="button-primary" [routerLink]="data.listPath"
            >Open task table</a
          >
        }
      </div>
      <div class="grid gap-5 xl:grid-cols-[18rem_1fr]">
        <aside class="panel h-fit p-3">
          <p
            class="px-3 pb-2 text-xs font-bold uppercase tracking-[.14em] text-slate-400"
          >
            Operations
          </p>
          @for (operation of data.operations; track operation.path) {
            <button
              class="operation"
              [class.operation-active]="selectedPath() === operation.path"
              (click)="select(operation)"
            >
              <span>{{ operation.label }}</span
              ><code>{{ operation.path }}</code>
            </button>
          }
        </aside>
        <article class="panel">
          <div
            class="flex items-start justify-between gap-4 border-b border-slate-200 pb-5 dark:border-slate-800"
          >
            <div>
              <p
                class="text-xs font-bold uppercase tracking-[.14em] text-brand-600 dark:text-violet-300"
              >
                POST
              </p>
              <h2 class="mt-1 text-lg font-bold">{{ selected().label }}</h2>
              <p class="mt-1 text-sm text-slate-500">
                {{
                  selected().note ||
                    "The active development user ID is sent in the user_id header."
                }}
              </p>
            </div>
            <code
              class="rounded-lg bg-slate-100 px-3 py-2 text-xs dark:bg-slate-800"
              >{{ selected().path }}</code
            >
          </div>
          <label class="mt-5 block"
            ><span class="mb-2 block text-sm font-semibold"
              >JSON request body</span
            ><textarea
              class="code-input"
              rows="10"
              [ngModel]="body()"
              (ngModelChange)="body.set($event)"
            ></textarea>
          </label>
          @if (parseError()) {
            <p class="mt-3 text-sm text-rose-600">{{ parseError() }}</p>
          }
          <div class="mt-4 flex items-center gap-3">
            <button
              class="button-primary"
              (click)="send()"
              [disabled]="loading()"
            >
              {{ loading() ? "Sending…" : "Send POST request" }}</button
            ><button class="button-secondary" (click)="reset()">
              Reset body
            </button>
          </div>
          @if (result(); as response) {
            <div
              class="mt-6 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800"
            >
              <div
                class="flex items-center justify-between bg-slate-50 px-4 py-2 dark:bg-slate-950"
              >
                <span class="text-sm font-semibold">Response</span
                ><span class="text-xs text-emerald-600 dark:text-emerald-300"
                  >Success</span
                >
              </div>
              <pre
                class="max-h-100 overflow-auto p-4 text-xs leading-6 text-slate-700 dark:text-slate-200"
                >{{ response | json }}</pre>
            </div>
          }
          @if (requestError()) {
            <div class="notice notice-error mt-6">{{ requestError() }}</div>
          }
        </article>
      </div>
    </section>
  `,
})
export class ApiWorkbenchComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(ApiService);
  readonly data = this.route.snapshot.data["workbench"] as WorkbenchData;
  readonly selected = signal(this.data.operations[0]);
  readonly selectedPath = computed(() => this.selected().path);
  readonly body = signal(this.selected().body);
  readonly result = signal<unknown | null>(null);
  readonly loading = signal(false);
  readonly parseError = signal<string | null>(null);
  readonly requestError = signal<string | null>(null);
  select(operation: Operation): void {
    this.selected.set(operation);
    this.reset();
    this.result.set(null);
    this.requestError.set(null);
  }
  reset(): void {
    this.body.set(this.selected().body);
    this.parseError.set(null);
  }
  send(): void {
    let body: Record<string, unknown>;
    try {
      body = JSON.parse(this.body()) as Record<string, unknown>;
      this.parseError.set(null);
    } catch {
      this.parseError.set("Enter valid JSON before sending the request.");
      return;
    }
    this.loading.set(true);
    this.result.set(null);
    this.requestError.set(null);
    this.api
      .post<unknown, Record<string, unknown>>(this.selected().path, body)
      .subscribe({
        next: (value) => this.result.set(value),
        error: (error: HttpErrorResponse) => {
          this.requestError.set(this.formatError(error));
          this.loading.set(false);
        },
        complete: () => this.loading.set(false),
      });
  }

  private formatError(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return "Cannot reach the API at localhost:3000. Start NestJS with npm run start:dev from the repository root.";
    }
    const message = error.error?.message;
    return Array.isArray(message)
      ? message.join(", ")
      : message || `Request failed with HTTP ${error.status}.`;
  }
}
