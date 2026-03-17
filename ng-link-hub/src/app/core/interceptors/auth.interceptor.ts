import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('access_token');

  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Si el log de Spring dice "JWT expired", el status será 401
      if (error.status === 401) {
        console.error("Sesión expirada. Limpiando datos...");
        localStorage.removeItem('access_token'); // <--- CRUCIAL
        router.navigate(['/auth/login']); 
      }
      return throwError(() => error);
    })
  );
};