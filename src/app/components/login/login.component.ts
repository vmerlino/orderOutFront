import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user.service';
import { login } from 'src/app/states/Auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  usuario: String;
  contrasena: String;
  error = false;
  constructor(
    private messageService : MessageService,
    private store: Store,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {}
  login() {
    let user = new User(this.usuario, this.contrasena);
    this.userService.login(user).subscribe(
      (value) => {
        if(value){
        let user2 = value.user;
        this.store.dispatch(login({ user: user2 }));
        this.router.navigate(['/admin/pedidos']);
        }else{

          this.messageService.add({
            severity: 'Error',
            summary: 'Usuario o contraseña incorrecta',
            detail: 'Por favor verifique los datos ingresados',
          });
        }
      }
    );
  }
}
