import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = "/api";
  /** The API intentionally uses POST for reads, filters, and pagination. */
  post<TResponse, TBody extends object>(
    path: string,
    body: TBody,
  ): Observable<TResponse> {
    return this.http.post<TResponse>(`${this.apiUrl}${path}`, body);
  }
}
