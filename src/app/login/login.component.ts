import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../signup/auth.service';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
declare const swal;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user={
    email:'fahad@gmail.com',
    password:'12345'
  }
isLoading:boolean = false;
  constructor(private authService: AuthService,private router:Router,
    private http:HttpClient) { }

  ngOnInit(): void {
  }
  onValidateUser(form:NgForm){
    this.isLoading=true;
    swal(`Loading........`);
  this.authService.validateUser(form.value).subscribe((response)=>{
    this.isLoading=false;
    console.log(response.token);
    localStorage.setItem('token', response.token.toString());
    this.authService.isAutorized.next(true);
    swal({
      title: "Authorized User!",
      text: "Successfully Logged In",
      icon: "success",
      button: "Ok",
    });
    this.router.navigate(['/dishes']);
  },(err)=>{
    swal({
      title: "Oops",
      text: err.error.message,
      icon: "error",
      button: "Ok",
    });
  });

  }
  onTestUser(){
    swal(`Loading........`);
     this.http.post<{ token: string }>(`${environment.backend}/auth`,{
       email:"fahad@gmail.com",
       password:'12345'
     })
     .subscribe((response)=>{
      localStorage.setItem('token', response.token.toString());
      this.authService.isAutorized.next(true);
      swal({
        title: "Test User!",
        text: "Successfully Logged In",
        icon: "success",
        button: "Ok",
      });
      this.router.navigate(['/dishes']);
     },err=>{
      swal({
        title: "Oops",
        text: err.error.message,
        icon: "error",
        button: "Ok",
      });
     });
  }

}
