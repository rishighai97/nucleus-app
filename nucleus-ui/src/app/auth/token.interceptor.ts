import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { UserService } from '../user.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: UserService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    if(request.url.split('/')[3]==='login' || request.url.split('/')[3]==='users'){
     
    }else{

        request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${this.auth.getToken()}`
            }
          });
    }
    
    return next.handle(request);
  }
}