import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
declare const swal;


import { AuthService } from './auth.service';

declare const M;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  isLoading: boolean = false;


  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit(): void {

    let elems = document.querySelectorAll('.datepicker');
    let instances = M.Datepicker.init(elems, {
      selectMonths: true, // Creates a dropdown to control month
      showClearBtn: true,
      autoClose: true,// Close upon selecting a date,
      selectYears: 100, // Creates a dropdown of 15 years to control year
      format: 'dd/mm/yyyy'
    });

  }
  onAddUser(form: NgForm) {
    this.isLoading = true;
    swal(`Loading........`);


    console.log(form.value);
    this.authService.addUser(form.value).subscribe((response) => {

      this.isLoading = false;
      swal({
        title: "Good job!",
        text: response.message,
        icon: "success",
        button: "Ok",
      });
      this.router.navigate(['/login']);

    }, (err) => {
      this.isLoading = false;
      swal({
        title: "Oops",
        text: err.error.message,
        icon: "error",
        button: "Ok",
      });
    });
  }

}
