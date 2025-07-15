import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-crear-pedido',
  templateUrl: './crear-pedido.component.html',
  styleUrls: ['./crear-pedido.component.css']
})
export class CrearPedidoComponent {
  pedido: any = {
    CardCode: '',
    DocDate: '',
    DocDueDate: '',
    TaxDate: '',
    DocCurrency: '$',
    DocRate: 1,
    SalesPersonCode: null,
    PriceMode: 'pmManual',
    PriceListNum: -1,
    NumAtCard: '',
    Comments: '',
    DocumentLines: [
      {
        ItemCode: '',
        Quantity: 1,
        UnitPrice: 0,
        WarehouseCode: '',
        TaxCode: '',
        DiscountPercent: 0,
        FreeText: ''
      }
    ]
  };

  constructor(private http: HttpClient) {}

  formatearFecha(fecha: string): string {
    return fecha?.split('T')[0];
  }

  agregarLinea() {
    this.pedido.DocumentLines.push({
      ItemCode: '',
      Quantity: 1,
      UnitPrice: 0,
      WarehouseCode: '',
      TaxCode: '',
      DiscountPercent: 0,
      FreeText: ''
    });
  }

  eliminarLinea(index: number) {
    if (this.pedido.DocumentLines.length > 1) {
      this.pedido.DocumentLines.splice(index, 1);
    }
  }

  enviarPedido() {
    if (!this.pedido.CardCode || this.pedido.DocumentLines.length === 0) {
      alert('⚠️ Por favor complete los campos obligatorios del pedido');
      return;
    }

    this.pedido.DocDate = this.formatearFecha(this.pedido.DocDate);
    this.pedido.DocDueDate = this.formatearFecha(this.pedido.DocDueDate);
    this.pedido.TaxDate = this.formatearFecha(this.pedido.TaxDate);

    const headers = { 'Content-Type': 'application/json' };

    this.http.post('http://localhost:5000/crear-pedido', JSON.stringify(this.pedido), { headers }).subscribe({
      next: (res) => {
        console.log('✅ Pedido enviado correctamente', res);
        alert('✅ Pedido enviado correctamente');
        this.resetFormulario();
      },
      error: (err) => {
        console.error('❌ Error al enviar el pedido', err);
        alert('❌ Error al enviar el pedido. Revisa la consola.');
      }
    });
  }

  resetFormulario() {
    this.pedido = {
      CardCode: '',
      DocDate: '',
      DocDueDate: '',
      TaxDate: '',
      DocCurrency: '$',
      DocRate: 1,
      SalesPersonCode: null,
      PriceMode: 'pmManual',
      PriceListNum: -1,
      NumAtCard: '',
      Comments: '',
      DocumentLines: [
        {
          ItemCode: '',
          Quantity: 1,
          UnitPrice: 0,
          WarehouseCode: '',
          TaxCode: '',
          DiscountPercent: 0,
          FreeText: ''
        }
      ]
    };
  }
}
