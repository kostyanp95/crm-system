import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

import { AuthService } from "../services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isAuthenticated()) {
      console.log(req);
      req = req.clone({
        setHeaders: {
          Authorization: this.authService.getToken()
        }
      })
      console.log(this.authService.getToken());
      console.log(req);
    }
    return next.handle(req);
  }
}
