import { Component, OnInit } from '@angular/core';
import { AuthService } from '../signup/auth.service';
import { CartService } from '../cart/cart.service';

declare const swal;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  count: number = this.cartService.getCarts().length;
  bill: boolean = false;
  isLogin: boolean = false;
  user:{
    name:string;
    email:string;
    _id:string;
  }
  constructor(private authService: AuthService, private cartService: CartService) {
      
   }

  ngOnInit(): void {
   

 //Authorized Or Not..
 this.authService.isAutorized.subscribe((login) => {
  this.isLogin = login;
});
//Cart items count....
this.cartService.cartCount.subscribe((value) => {
  this.count = value;
});
//Open Bill....
this.cartService.bill.subscribe((value) => {
  this.bill = value;
});
 //Getting logged in user...
if(this.isLogin){
  this.authService.currentUser().subscribe((res) =>{

this.user=res.user;
  })

} 
if(!this.isLogin){
this.user=null;

}
   
  }
  

}
