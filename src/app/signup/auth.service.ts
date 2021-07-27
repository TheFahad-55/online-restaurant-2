import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user.interface';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  
  isAutorized;

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    if (token &&token!=null) {
      this.isAutorized = new BehaviorSubject(true);
    }
    else {
      this.isAutorized = new BehaviorSubject(false);
    }
  }
  addUser(user: User) {
    return this.http.post<{ message: string }>(`${environment.backend}/users`, user);
  }
  canActivate(): boolean {
    const token=localStorage.getItem('token');
    
    if (token ===null) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  validateUser(user: { email: string, password: string }) {

    return this.http.post<{ token: string }>(`${environment.backend}/auth`, user);

  }
  forgotPassword(email) {
    return this.http.post<{ message: string }>(`${environment.backend}/auth/forgot-password`, email);
  }
  resetPassword(token: string, password) {


    return this.http.put<{ token: string }>(`${environment.backend}/auth/reset-password/${token}`, { password: password });
  }

  currentUser(){
    return this.http.get<{user:{name:string,email:string,_id:string}}>(`${environment.backend}/auth/me`);
  }
  getToken(){
    return localStorage.getItem('token');
  }


}

