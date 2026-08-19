import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const auth = inject(AuthService);
  const userId = auth.getUserId();
  const token = auth.accessToken();
  const headers: Record<string, string> = {};
  if (userId !== null) headers["user_id"] = String(userId);
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return next(
    Object.keys(headers).length
      ? request.clone({ setHeaders: headers })
      : request,
  );
};
