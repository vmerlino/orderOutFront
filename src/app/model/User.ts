import { Role } from "./Role";

export class User {
    email: String;
    password: String;
    name: String;
    usersRoles: Role[];
    constructor( email: String, password: String){
        this.email = email;
        this.password = password;
    }
}