import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headerObj = { setHeaders: {} };
    headerObj.setHeaders['Access-Control-Allow-Origin'], '*';
    request = request.clone(headerObj);    
    return next.handle(request);
  }
}
