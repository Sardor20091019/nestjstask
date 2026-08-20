import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class ApiService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://nestjstask-1.onrender.com";

  post<TResponse, TBody extends object>(
    path: string,
    body: TBody,
  ): Observable<TResponse> {
    // Grab the token from localStorage
    const token = localStorage.getItem("token");

    // Build headers dynamically, attaching Bearer token if it exists
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    });

    return this.http.post<TResponse>(`${this.apiUrl}${path}`, body, {
      headers,
    });
  }
}
