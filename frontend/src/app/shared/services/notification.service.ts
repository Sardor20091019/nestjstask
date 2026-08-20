import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  title?: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private toastsSignal = signal<Toast[]>([]);
  readonly toasts = this.toastsSignal.asReadonly();

  show(toast: Omit<Toast, 'id'>) {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = { ...toast, id, duration: toast.duration || 4000 };
    
    this.toastsSignal.update(current => [...current, newToast]);

    if (newToast.duration! > 0) {
      setTimeout(() => this.remove(id), newToast.duration);
    }
  }

  success(message: string, title?: string) {
    this.show({ type: 'success', message, title });
  }

  error(message: string, title?: string) {
    this.show({ type: 'error', message, title, duration: 6000 });
  }

  info(message: string, title?: string) {
    this.show({ type: 'info', message, title });
  }

  remove(id: string) {
    this.toastsSignal.update(current => current.filter(t => t.id !== id));
  }
}
