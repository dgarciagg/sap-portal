import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listar-pedidos',
  templateUrl: './listar-pedidos.component.html',
  styleUrls: ['./listar-pedidos.component.css']
})
export class ListarPedidosComponent implements OnInit {
  pedidos: any[] = [];
  cargando = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerPedidos();
  }

  obtenerPedidos() {
    this.cargando = true;
    this.http.get<any>('http://localhost:5000/listar-pedidos').subscribe({
      next: (res) => {
        this.pedidos = res.value || [];
        this.cargando = false;
      },
      error: (err) => {
        alert('❌ Error al obtener los pedidos');
        console.error(err);
        this.cargando = false;
      }
    });
  }
}
