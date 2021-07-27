import { Dish } from "./dish.interface";

export interface Cart{
_id: string;
user:string;
dish:Dish;
quantity:number;
}
