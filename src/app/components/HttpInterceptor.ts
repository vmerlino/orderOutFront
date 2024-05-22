import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Obtener el token de autenticación de tu servicio de autenticación
    const authToken = 'your-auth-token';

    // Clonar la solicitud y agregar el encabezado de autorización
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${authToken}` }
    });

    // Enviar la solicitud con el encabezado de autorización
    return next.handle(authReq);
  }
}
