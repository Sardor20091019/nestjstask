import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { map, tap } from "rxjs";

const USER_ID_KEY = "task-manager.user_id";
const ACCESS_TOKEN_KEY = "task-manager.access_token";
const API_BASE_URL = "https://nestjstask-1.onrender.com";

@Injectable({ providedIn: "root" })
export class AuthService {
  private readonly http = inject(HttpClient);
  readonly userId = signal<number | null>(this.readUserId());
  readonly accessToken = signal<string | null>(
    localStorage.getItem(ACCESS_TOKEN_KEY),
  );

  setUserId(userId: number): void {
    localStorage.setItem(USER_ID_KEY, String(userId));
    this.userId.set(userId);

    this.requestDevelopmentToken().subscribe({
      error: (err) =>
        console.error("Failed to auto-fetch development token:", err),
    });
  }

  clearUserId(): void {
    localStorage.removeItem(USER_ID_KEY);
    this.userId.set(null);
    this.clearAccessToken();
  }

  getUserId(): number | null {
    return this.userId();
  }

  private readonly apiUrl = API_BASE_URL;

  requestDevelopmentToken() {
    const userId = this.getUserId();
    if (userId === null)
      throw new Error("Set a user ID before requesting a token.");
    return this.http
      .post<{ access_token: string }>(`${this.apiUrl}/auth/development-token`, {
        user_id: userId,
      })
      .pipe(
        map(({ access_token }) => access_token),
        tap((token) => this.setAccessToken(token)),
      );
  }

  private setAccessToken(token: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    this.accessToken.set(token);
  }

  private clearAccessToken(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.accessToken.set(null);
  }

  private readUserId(): number | null {
    const value = localStorage.getItem(USER_ID_KEY);
    const id = value === null ? Number.NaN : Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
  }
}