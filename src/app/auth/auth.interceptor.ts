import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private JWTToken = localStorage.getItem('token');

  constructor(
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authService.isLoggedIn()) {
      this.JWTToken = this.authService.getToken()
      const cloned = request.clone({
        headers: request.headers.set("Authorization",
          "Bearer " + this.JWTToken)
      });
      return next.handle(cloned);
    }
    return next.handle(request);
  }
}
