export class Waiter {
    id: number | null;
    name: string;
    color :String;
  
    constructor(id: number | null, name: string, color:string) {
      this.id = id;
      this.name = name;
      this.color = color
    }
  }