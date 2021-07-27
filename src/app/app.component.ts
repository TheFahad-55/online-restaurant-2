import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartService } from './cart/cart.service';
import { AuthService } from './signup/auth.service';

declare const M;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private cartService: CartService, private authService: AuthService) { }
  title = 'restaurant-front';

  ngOnInit(): void {


    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    M.AutoInit();
  }
}
