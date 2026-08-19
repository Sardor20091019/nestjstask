import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";

/** Adds the API's custom authentication header; this backend does not use Bearer tokens. */
export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const userId = inject(AuthService).getUserId();
  return next(
    userId === null
      ? request
      : request.clone({ setHeaders: { user_id: String(userId) } }),
  );
};
