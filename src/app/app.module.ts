import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {TabMenuModule} from 'primeng/tabmenu';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import {OrderListModule} from 'primeng/orderlist';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';
import { ProductService } from './services/ProductService';
import { HttpClientModule } from '@angular/common/http';
import {TabViewModule} from 'primeng/tabview';

import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup'; 
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    CatalogoComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    DropdownModule,
    TabMenuModule,
    OrderListModule,
    VirtualScrollerModule,
    FormsModule,
    TabViewModule,
    HttpClientModule,
    SkeletonModule,
    AvatarModule,
    AvatarGroupModule,
    AppRoutingModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
