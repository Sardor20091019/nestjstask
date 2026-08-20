import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class ApiService {
  private readonly http = inject(HttpClient);
  
  // Automatically uses Render in production, localhost during development
  private readonly apiUrl = 
    window.location.hostname === 'localhost' 
      ? 'http://localhost:3000' 
      : 'https://nestjstask-1.onrender.com';

  /** The API intentionally uses POST for reads, filters, and pagination. */
  post<TResponse, TBody extends object>(
    path: string,
    body: TBody,
  ): Observable<TResponse> {
    return this.http.post<TResponse>(`${this.apiUrl}${path}`, body);
  }
}