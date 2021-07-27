import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../signup/auth.service';
declare const swal;
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  token: string;
  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.token = params.token;
    })
  }
  onResetPassword(form: NgForm) {
    console.log(form.value);
    this.authService.resetPassword(this.token, form.value.password).subscribe((response) => {
      swal({
        title: "Success",
        text: "Successfully updated the password",
        icon: "success",
        button: "Ok",
      });
      localStorage.setItem('token', response.token);
      this.authService.isAutorized.next(true);
      this.router.navigate(['/dishes']);

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
