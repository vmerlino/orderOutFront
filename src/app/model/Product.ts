import { Category } from "./Category";

export class Product {
  id: number|null;
  name: string;
  description: string;
  imageUrl: string | null;
  isVegan: boolean;
  isGlutenFree: boolean;
  price: number;
  category: Category;

  
    constructor(id: number | null, name: string,price: number, category: Category, description: string, imageUrl: string | null, isVegan: boolean, isGlutenFree: boolean) {
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
  