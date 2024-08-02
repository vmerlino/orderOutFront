import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loggedIn } from './states/Auth.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'order-out-front';
 
  isHomePage = false;
  isLoggedIn$ : Observable<boolean>;
  isLoggedIn = false;

  constructor(private router: Router, private store: Store) {
    this.isLoggedIn$ = this.store.pipe(select(loggedIn));

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = this.router.url === '/' || !!event.urlAfterRedirects.match(/^\/home\/.*/) || this.router.url === '/**'|| this.router.url === '/login';
      }
    });
  }
  ngOnInit(): void {
    if(this.isLoggedIn$){
      this.isLoggedIn$.subscribe(value =>{
        if(value){
          this.isLoggedIn = value
        }
      })
    }
  }
}
