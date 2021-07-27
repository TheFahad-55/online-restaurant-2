import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { DishService } from '../dishes/dish.service';
import { Dish } from '../interfaces/dish.interface';
import { Favourite } from '../interfaces/favourite.interface';

declare const swal;
@Component({
  selector: 'app-favourite-food',
  templateUrl: './favourite-food.component.html',
  styleUrls: ['./favourite-food.component.scss']
})
export class FavouriteFoodComponent implements OnInit {
  error: string = null;
  favDishes: { _id: string, dish: Dish }[] = [];
  isLoading: boolean = false;
  favouriteDishId: string;
  constructor(private dishService: DishService, private router: Router, private cartService: CartService) {

  }

  ngOnInit(): void {
    this.getFavouriteDishes();
  }
  getFavouriteDishes() {
    this.isLoading = true;
    this.dishService.getFavouriteDishes().subscribe((response) => {
      this.isLoading = false;
      console.log(response);
      response.favourites.map((fav) => {

        this.favDishes.push({ _id: fav._id, dish: fav.favDish });

      });
    }, (err) => {
     if(err){
      this.isLoading = false;
      swal({
        title: "Oops",
        text: err.error.message,
        icon: "error",
        button: "Ok",
      });
     }
    })

  }

  //Add To Cart....
  onAddToCart(dish: Dish) {

    swal("Loading...");
    this.cartService.addDishToCart(dish).subscribe((response) => {
      this.router.navigate(['/cart']);
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


  //Remove the item from the favourite fopd list...
  onRemovefromfavourite(id: string, dish: Dish) {
    this.isLoading = true;
    swal("Loading.......");
    this.dishService.removeFromFavoriteDishes(id).subscribe((response) => {
      this.isLoading = false;
      swal({
        title: "Done",
        text: response.message,
        icon: "success",
        button: "Ok",
      });
      //Delete from the view....
      const index = this.favDishes.indexOf({ _id: id, dish: dish });
      this.favDishes.splice(index, 1);

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
