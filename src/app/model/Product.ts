import { Category } from "./Category";

export class Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: Category
    imageUrl: string;
    isVegan: boolean;
    isGlutenFree: boolean;
  
    constructor(id: number, name: string, description: string,price: number,category:Category, imageUrl: string, isVegan: boolean, isGlutenFree: boolean) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.price = price;
      this.category = category;
      this.imageUrl = imageUrl;
      this.isVegan = isVegan;
      this.isGlutenFree = isGlutenFree;
    }
  }
  