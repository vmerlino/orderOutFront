import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService implements OnDestroy {
  private socket: WebSocket;
  private messagesSubject: Subject<any> = new Subject<any>();

  constructor() {
    this.connect();
  }

  private connect(): Promise<void> {
    return new Promise((resolve, reject) => {
        this.socket = new WebSocket('ws://localhost:4200'); // Asegúrate de que esta URL sea correcta.

        this.socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                this.messagesSubject.next(data);
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        };

        this.socket.onopen = () => {
            console.log('WebSocket connection established.');
            resolve(); // Resuelve la promesa cuando la conexión está abierta
        };

        this.socket.onclose = () => {
            console.log('WebSocket connection closed. Attempting to reconnect...');
            setTimeout(() => this.connect(), 1000); // Reconectar después de 1 segundo
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
            reject(error); // Rechaza la promesa en caso de error
        };
    });
}
  public  async sendMessage(message: any) {
    if (this.socket.readyState === WebSocket.CONNECTING) {
     await this.connect();
    }
    console.log("entro socket")
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not open. Current state:', this.socket.readyState);
  }    
  }
  

  public get messages$() {
    return this.messagesSubject.asObservable();
  }

  ngOnDestroy() {
    if (this.socket) {
      this.socket.close();
    }
  }
}
