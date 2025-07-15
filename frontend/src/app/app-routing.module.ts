import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearPedidoComponent } from './crear-pedido/crear-pedido.component';
import { ListarPedidosComponent } from './listar-pedidos/listar-pedidos.component';

const routes: Routes = [
  { path: '', redirectTo: 'crear-pedido', pathMatch: 'full' },
  { path: 'crear-pedido', component: CrearPedidoComponent },
  { path: 'listar-pedidos', component: ListarPedidosComponent },
  // Puedes agregar más rutas aquí si lo necesitas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
