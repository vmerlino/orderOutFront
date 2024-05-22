export class Waiter {
    id: number;
    name: string;
    age: number;
    experienceYears: number;
    imageUrl: string;
    isExperienced: boolean;
  
    constructor(id: number, name: string, age: number, experienceYears: number, imageUrl: string, isExperienced: boolean) {
      this.id = id;
      this.name = name;
      this.age = age;
      this.experienceYears = experienceYears;
      this.imageUrl = imageUrl;
      this.isExperienced = isExperienced;
    }
  }