import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { Cart } from '../interfaces/cart.interface';
declare const swal;
@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  carts: Cart[] = [];
  isLoading: boolean = false;
  error: any;
  total: number = 0;
  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.getCartItems();

  }

  getCartItems() {
    this.isLoading = true;
    this.cartService.getCartItems().subscribe((response) => {
      this.isLoading = false;

      console.log(response);
      this.cartService.cartCount.next(response.carts.length);
      console.log(response.carts.length);
      response.carts.map((cart) => {
        this.carts.push(cart);
        this.total = this.total + cart.dish.total;

      });

    }, (err) => {
      this.isLoading = false;
      this.error = err.message;
      swal({
        title: "Oops",
        text: err.error.message,
        icon: "error",
        button: "Ok",
      });
    })

  }

  onBacktocart() {
    this.cartService.bill.next(false);
    this.router.navigate(['/cart']);
  }
  onMakePurchase() {
    swal('Loading purchase');
    this.cartService.bill.next(false);
    swal({
      title: "Thankyou",
      text: "You will recieve your order within few hours.Thanks for trying FoodTiger :)",
      icon: "success",
      button: "Ok",
    });

    this.cartService.emptyCart().subscribe((result) => {
      this.cartService.cartCount.next(0);
      this.router.navigate(['/dishes']);
    }, err => {
      swal({
        title: "Oops",
        text: err.error.message,
        icon: "error",
        button: "Ok",
      });
    });

  }

}
