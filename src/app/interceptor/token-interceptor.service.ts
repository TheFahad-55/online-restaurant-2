import { Injectable } from '@angular/core';
  
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from '../signup/auth.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private authService:AuthService) { }
  intercept(request:HttpRequest<any>,next:HttpHandler){
    const token=this.authService.getToken();
    if(token){
      request=request.clone({
        setHeaders:{'x-auth':token}
      });
      console.log(request);
      console.log(token);

    }
    return next.handle(request);


  }
}
