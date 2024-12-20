import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { lanzarmensaje } from './OrderState.actions';
import { tap } from 'rxjs/operators';
import { WebSocketService } from '../services/web-socket.service'; // Asegúrate de importar tu servicio WebSocket

@Injectable()
export class OrderEffects {
  constructor(
    private actions$: Actions,
    private websocketService: WebSocketService // Inyecta tu servicio de WebSocket
  ) {}

  // Crea el efecto que escuchará por la acción lanzarmensaje y ejecutará el envío de WebSocket
  lanzarmensaje$ = createEffect(
    () => this.actions$.pipe(
      ofType(lanzarmensaje), // Escucha por la acción lanzarmensaje
      tap(() => {
        this.websocketService.sendMessage({ pagado: "pagado" }); // Enviar mensaje por WebSocket
      })
    ),
    { dispatch: false } // No necesitamos despachar otra acción
  );
}
