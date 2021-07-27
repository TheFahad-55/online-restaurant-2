import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../interfaces/cart.interface';
import { Dish } from '../interfaces/dish.interface';
import { CartService } from './cart.service';

declare const swal;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  carts: Cart[] = [];
  isLoading: boolean = false;
  error: any;
  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.getCartItems();

  }

  getCartItems() {
    this.isLoading = true;
    this.cartService.getCartItems().subscribe((response) => {
      this.isLoading = false;

      console.log(response);

      console.log(response.carts.length);
      this.cartService.setCarts(response.carts);
      this.cartService.cartCount.next(this.cartService.getCarts().length);
      response.carts.map((cart) => {
        this.carts.push(cart);


      });

    }, (err) => {
      this.isLoading = false;
      this.error = err.message;
      swal("Your cart  is empty,Add disehs that you want in the cart!");
    })

  }
  //Increase The quantity..
  onIncreaseCart(id: string) {
    swal('Loading...');
    this.cartService.increaseCart(id).subscribe((response) => {

      //update the ui ...
      let cart = this.carts.find((cart) => {
        return cart._id === id;

      });
      console.log(cart);

      cart.quantity = cart.quantity + 1;
      cart.dish.total = cart.dish.price * cart.quantity;
      swal({
        title: "Success",
        text: response.message,
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

  onDecreaseCart(id: string) {
    swal('Loading...');
    this.cartService.decreaseCart(id).subscribe((response) => {
      //update the ui ...
      let cart = this.carts.find((cart) => {
        return cart._id === id;

      });
      console.log(cart);

      cart.quantity = cart.quantity - 1;
      cart.dish.total = cart.dish.total - cart.dish.price;
      swal({
        title: "Success",
        text: response.message,
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
  onRemoveFromCart(id: string, cart: Cart) {
    swal('Loading...');
    this.cartService.removeFromTheCart(id).subscribe((response) => {
      //remove from ui..
      let index = this.carts.indexOf(cart);
      this.carts.splice(index, 1);
      this.cartService.cartCount.next(this.carts.length);
      swal({
        title: "Success",
        text: response.message,
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
  onAddToBill() {
    this.cartService.bill.next(true);
    this.router.navigate(['/bill']);
  }

}
