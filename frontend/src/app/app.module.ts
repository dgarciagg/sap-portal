import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearPedidoComponent } from './crear-pedido/crear-pedido.component';
import { ListarPedidosComponent } from './listar-pedidos/listar-pedidos.component';

@NgModule({
  declarations: [
    AppComponent,
    CrearPedidoComponent,
    ListarPedidosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
