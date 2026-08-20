import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

const API_BASE_URL = "https://nestjstask-1.onrender.com";

@Injectable({ providedIn: "root" })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = API_BASE_URL;

  post<TResponse, TBody extends object>(
    path: string,
    body: TBody,
  ): Observable<TResponse> {
    // Grab the token and user id from localStorage
    const token = localStorage.getItem("task-manager.access_token");
    const userId = localStorage.getItem("task-manager.user_id");

    // Build headers dynamically, attaching Bearer token if it exists
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    if (token) {
      headers = headers.set("Authorization", `Bearer ${token}`);
    }
    if (userId) {
      headers = headers.set("user_id", userId);
    }

    return this.http.post<TResponse>(`${this.apiUrl}${path}`, body, {
      headers,
    });
  }
}