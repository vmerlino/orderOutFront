import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService implements OnDestroy {
  private socket: WebSocket;
  private messagesSubject: Subject<any> = new Subject<any>();
  private channel: BroadcastChannel;

  constructor() {
    this.channel = new BroadcastChannel('websocket_channel'); // Crear el canal de comunicación entre pestañas
    this.channel.onmessage = (event) => {
      console.log('Received from another tab:', event.data);
      this.messagesSubject.next(event.data); // Pasar el mensaje a los suscriptores del servicio
    };
    
    this.connect();
  }

  private connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket = new WebSocket('ws://localhost:4200'); // URL del WebSocket, asegúrate de que sea la correcta

      this.socket.onmessage = (event) => {
        try {
          const data = this.parseMessage(event.data); // Manejar mensajes Blob o JSON
          console.log('Message received via WebSocket:', data);
          this.messagesSubject.next(data); // Enviar el mensaje a través del Subject
          this.channel.postMessage(data);  // Enviar el mensaje a otras pestañas
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
        reject(error); // Rechazar la promesa en caso de error
      };
    });
  }

  private parseMessage(data: any): any {
    if (typeof data === 'string') {
      return JSON.parse(data); // Si el mensaje es un string, parsear como JSON
    } else if (data instanceof Blob) {
      return this.handleBlob(data); // Si es un Blob, manejarlo adecuadamente
    } else {
      console.warn('Unknown message format:', data);
      return data;
    }
  }

  private handleBlob(blob: Blob): Promise<any> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result as string;
        resolve(JSON.parse(text)); // Convertir el contenido del Blob en JSON
      };
      reader.readAsText(blob);
    });
  }

  public async sendMessage(message: any) {
    if (this.socket.readyState === WebSocket.CONNECTING) {
      await this.connect();
    }
    console.log('Sending message through WebSocket');
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
    this.channel.close(); // Cerrar el canal de comunicación entre pestañas
  }
}
