import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { CartComponent } from './components/cart/cart.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { ProductosComponent } from './components/productos/productos.component';
import { LoginComponent } from './components/login/login.component';
import { ProductosAdminComponent } from './components/admin/productos-admin/productos-admin.component';
import { ReservasAdminComponent } from './components/admin/reservas-admin/reservas-admin.component';
import { CategoriasAdminComponent } from './components/admin/categorias-admin/categorias-admin.component';
import { CuentasAdminComponent } from './components/admin/cuentas-admin/cuentas-admin.component';
import { PedidosAdminComponent } from './components/admin/pedidos-admin/pedidos-admin.component';
import { MozosAdminComponent } from './components/admin/mozos-admin/mozos-admin.component';
import { MenusAdminComponent } from './components/admin/menus-admin/menus-admin.component';
import { CategoryCreateComponent } from './components/addNew/category-create/category-create.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin/productos', component: ProductosAdminComponent },
  { path: 'admin/reservas', component: ReservasAdminComponent },
  { path: 'admin/categorias', component: CategoriasAdminComponent },
  { path: 'admin/mozos', component: MozosAdminComponent },
  { path: 'admin/pedidos', component: PedidosAdminComponent },
  { path: 'admin/cuentas', component: CuentasAdminComponent },
  { path: 'admin/menu', component: MenusAdminComponent },
  { path: 'admin/crear/categoria', component: CategoryCreateComponent },
  //mobile
  { path: 'productos', component: ProductosComponent },
  { path: 'wallet', component: WalletComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'cart', component: CartComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'search', component: SearchComponent },
  { path: 'home/:id', component: HomeComponent },
  //defult
  { path: '**', component: HomeComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
