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
import {MenuModule} from 'primeng/menu';
import { SkeletonModule } from 'primeng/skeleton';
import { ProductService } from './services/ProductService';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {TabViewModule} from 'primeng/tabview';
import { ChipModule } from 'primeng/chip';
import {InputNumberModule} from 'primeng/inputnumber';
import {PasswordModule} from 'primeng/password';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import { CartComponent } from './components/cart/cart.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { LoginComponent } from './components/login/login.component';
import {InputTextModule} from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductosComponent } from './components/productos/productos.component'; 
import { environment } from 'src/environments/environment';
import { MenuAdminComponent } from './components/menu/menu-admin/menu-admin.component';
import { ProductosAdminComponent } from './components/admin/productos-admin/productos-admin.component';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { ReservasAdminComponent } from './components/admin/reservas-admin/reservas-admin.component';
import { CategoriasAdminComponent } from './components/admin/categorias-admin/categorias-admin.component';
import { MozosAdminComponent } from './components/admin/mozos-admin/mozos-admin.component';
import { PedidosAdminComponent } from './components/admin/pedidos-admin/pedidos-admin.component';
import { CuentasAdminComponent } from './components/admin/cuentas-admin/cuentas-admin.component';
import { MenusAdminComponent } from './components/admin/menus-admin/menus-admin.component';
import { AuthInterceptor } from './components/HttpInterceptor';
import { CategoryCreateComponent } from './components/addNew/category-create/category-create.component';
import { MozoCreateComponent } from './components/addNew/mozo-create/mozo-create.component';
import { ProductoCreateComponent } from './components/addNew/producto-create/producto-create.component';
import { MenuCreateComponent } from './components/addNew/menu-create/menu-create.component';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    CatalogoComponent,
    CartComponent,
    WalletComponent,
    LoginComponent,
    ProductosComponent,
    MenuAdminComponent,
    ProductosAdminComponent,
    ReservasAdminComponent,
    CategoriasAdminComponent,
    MozosAdminComponent,
    PedidosAdminComponent,
    CuentasAdminComponent,
    MenusAdminComponent,
    CategoryCreateComponent,
    MozoCreateComponent,
    ProductoCreateComponent,
    MenuCreateComponent
  ],
  imports: [
    AppRoutingModule,
    AvatarGroupModule,
    AvatarModule,
    BrowserAnimationsModule,
    BrowserModule,
    ButtonModule,
    ChipModule,
    DialogModule,
    DropdownModule,
    FormsModule,
    HttpClientModule,
    InputNumberModule,
    InputTextModule,
    MenuModule,
    OrderListModule,
    PasswordModule,
    RippleModule,
    SkeletonModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreModule.forRoot({}, {}),
    TabMenuModule,
    TabViewModule,
    TableModule,
    VirtualScrollerModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },ProductService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
