import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { loggedIn } from './states/Auth.reducer';
import { login } from './states/Auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

async canActivate(): Promise<boolean> {
    // Recupera el estado de autenticación desde localStorage
    const authState = JSON.parse(localStorage.getItem('authState') || 'null');
  
    if (authState && authState.loggedIn) {
      // Despacha la acción de login para establecer el usuario en el store
      await this.store.dispatch(login({ user: authState.user }));
  
      // Permite la navegación si el usuario está autenticado
      return true;
    } else {
      // Si no está autenticado, redirige a la página de login
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
