export interface Dish{
  _id:string;
  name:string;
  preparationTime:string;
  description:string;
  price:number;
  special:boolean;
  imagePath:string;
  total?:number;
}
