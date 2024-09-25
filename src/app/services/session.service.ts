import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionKey = 'userSession';
  private sessionTimeout = 40 * 60 * 1000; // 40 minutos en milisegundos

  constructor(private router: Router) { }

  startSession(data: any): void {
    const sessionData = {
      data,
      timestamp: new Date().getTime()
    };
    sessionStorage.setItem(this.sessionKey, JSON.stringify(sessionData));
    this.checkSessionExpiration();
  }

  getSessionData(): any {
    const sessionData = sessionStorage.getItem(this.sessionKey);
    if (sessionData) {
      const parsedData = JSON.parse(sessionData);
      return parsedData.data;
    }
    return null;
  }

  endSession(): void {
    sessionStorage.removeItem(this.sessionKey);
    this.router.navigate(['/login']); // Redirigir al login o a otra página al finalizar la sesión
  }

  private checkSessionExpiration(): void {
    const sessionData = sessionStorage.getItem(this.sessionKey);
    if (sessionData) {
      const parsedData = JSON.parse(sessionData);
      const currentTime = new Date().getTime();
      if (currentTime - parsedData.timestamp > this.sessionTimeout) {
        this.endSession();
      } else {
        setTimeout(() => {
          this.checkSessionExpiration();
        }, 1000); // Verificar cada segundo
      }
    }
  }
}
