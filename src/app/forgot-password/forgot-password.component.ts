import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../signup/auth.service';
declare const swal;
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  onForgotPassword(form: NgForm) {
    swal('Loading...');
    this.authService.forgotPassword(form.value).subscribe((response) => {
      swal({
        title: response.message,
        text: "Please check your email and follow the link to reset your password.",
        icon: "success",
        button: "Ok",
      });
    }, (err) => {
      console.log(err);
      swal({
        title: "Oops",
        text: err.error.message,
        icon: "error",
        button: "Ok",
      });
    });
  }

}
