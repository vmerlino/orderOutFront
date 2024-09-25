import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Route, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { loggedIn } from 'src/app/states/Auth.reducer';
import { TableState } from 'src/app/states/TableState.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  table$: any;
  table: any;
  isLoggedIn$ : any;
  isLoggedIn = false;
  isHomePage= false;

  constructor( private router :Router, private websocketService: WebSocketService, private store: Store<{ table: TableState }>) {
    this.table$ = this.store.select((state) =>
    state.table ? state.table : null
  ); 
  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      this.isHomePage = this.router.url === '/' || !!event.urlAfterRedirects.match(/^\/home\/.*/) || this.router.url === '/**'|| this.router.url === '/login';
    }})
    this.isLoggedIn$ =JSON.parse(localStorage.getItem('authState') || 'null');
}

  ngOnInit(): void {

    this.table$.subscribe((table: { table: any; }) => {
      this.table = table.table;
    });
    if(this.isLoggedIn$ != null){
      this.isLoggedIn = this.isLoggedIn$!.loggedIn;
  }
  }
  pedirMozo() {
    if (this.table && this.table.id) {
      console.log(this.table)  // Verifica que `this.table` y `this.table.id` no sean nulos o indefinidos
      const request = { tableNumber: this.table.id };
      this.websocketService.sendMessage(request);
    } else {
      console.error('Table or Table ID is not defined.');
    }
  }
}
