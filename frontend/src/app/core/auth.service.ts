import { Injectable, signal } from "@angular/core";

const USER_ID_KEY = "task-manager.user_id";

@Injectable({ providedIn: "root" })
export class AuthService {
  readonly userId = signal<number | null>(this.readUserId());

  setUserId(userId: number): void {
    localStorage.setItem(USER_ID_KEY, String(userId));
    this.userId.set(userId);
  }

  clearUserId(): void {
    localStorage.removeItem(USER_ID_KEY);
    this.userId.set(null);
  }

  getUserId(): number | null {
    return this.userId();
  }

  private readUserId(): number | null {
    const value = localStorage.getItem(USER_ID_KEY);
    const id = value === null ? Number.NaN : Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
  }
}
