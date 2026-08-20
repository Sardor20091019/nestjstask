import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm pointer-events-none">
      @for (toast of notifications.toasts(); track toast.id) {
        <div 
          class="pointer-events-auto w-full overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-200/50 ring-1 ring-slate-900/5 dark:bg-slate-900 dark:shadow-slate-900/50 dark:ring-slate-700 transition-all duration-300 transform translate-y-0 opacity-100"
        >
          <div class="p-4 flex items-start gap-3">
            <div class="shrink-0 pt-0.5">
              @if (toast.type === 'success') {
                <svg class="h-5 w-5 text-emerald-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              } @else if (toast.type === 'error') {
                <svg class="h-5 w-5 text-rose-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
              } @else {
                <svg class="h-5 w-5 text-sky-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              }
            </div>
            <div class="flex-1 w-0">
              @if (toast.title) {
                <p class="text-sm font-semibold text-slate-900 dark:text-slate-100">{{ toast.title }}</p>
              }
              <p class="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{{ toast.message }}</p>
            </div>
            <div class="ml-4 flex shrink-0">
              <button 
                type="button" 
                class="inline-flex rounded-md bg-white text-slate-400 hover:text-slate-500 focus:outline-none dark:bg-slate-900 dark:text-slate-500 dark:hover:text-slate-400 transition-colors"
                (click)="notifications.remove(toast.id)"
              >
                <span class="sr-only">Close</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class ToastContainerComponent {
  readonly notifications = inject(NotificationService);
}
