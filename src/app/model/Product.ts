import { Byte } from "@angular/compiler/src/util";
import { Category } from "./Category";
import { Time } from "@angular/common";

export class Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string | null;
  image: Byte | File;
  photo: any;
  isVegan: boolean;
  isGlutenFree: boolean;
  price: number;
  category: Category;
  categoryId: number;
  making: number;
  hidden: boolean;
  constructor(id: number, name: string, price: number, category: Category, description: string, imageUrl: string | null, isVegan: boolean, isGlutenFree: boolean, image: Byte | File, photo: any, time: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
    this.imageUrl = imageUrl;
    this.isVegan = isVegan;
    this.isGlutenFree = isGlutenFree;
    this.image = image;
    this.photo = photo;
    this.making = time;
  }
  
}
