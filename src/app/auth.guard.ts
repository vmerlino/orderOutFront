import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { loggedIn } from './states/Auth.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.select(loggedIn).pipe(
      take(1), // Nos suscribimos solo una vez
      map(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigate(['/login']); // Redirige a la página de login si no está autenticado
          return false;
        }
        return true;
      })
    );
  }
}
