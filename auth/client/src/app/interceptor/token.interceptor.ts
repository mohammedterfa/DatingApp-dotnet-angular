import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authService.getToken()) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + this.authService.getToken())
      });
      return next.handle(cloned);  // Correcting this line
    }
    return next.handle(request);  // Ensure this line is called for requests without a token
  }
}
