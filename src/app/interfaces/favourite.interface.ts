export interface Favourite{
  _id: string;
  user:string
  favDish:{
    _id: string;
    name:string;
    description:string;
    price:number;
    special:boolean;
    preparationTime:string;
    imagePath:string;
  }
}
