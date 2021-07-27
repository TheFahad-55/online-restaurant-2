import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


declare const M;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    var instance = M.Carousel.init({
      fullWidth: true
    });
  }
  onCheckDishes() {
    this.router.navigate(['/dishes']);
  }

}
