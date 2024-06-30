import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usuario: String;
  contrasena: String;
  constructor(private userService: UserService) { }
  
  ngOnInit(): void {
  }
  login() {
   let user =  new User("", this.usuario, this.contrasena);
  this.userService.login(user).subscribe();
  }

}
