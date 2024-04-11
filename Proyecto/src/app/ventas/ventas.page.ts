import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.page.html',
  styleUrls: ['./ventas.page.scss'],
})
export class VentasPage implements OnInit {

  ip !: string;
  VerListaDetalles: any;
  ListaVenta: any;

  VerVentas !: boolean;
  VerDetalles !: boolean;

  constructor(public http: HttpClient) {
    //this.ip = '192.168.0.109';
    this.ip = 'richiapi.x10.mx';
    this.VerListaDetalles = [];
    this.ListaVenta = [];


  }

  ngOnInit() {
    this.ListarVentas();
    this.VerVentas = false;
    this.VerDetalles = false;

    if (this.VerListaDetalles.length == 0) {
      this.VerVentas = true;
      this.VerDetalles = false;
    }
  }

  ListarVentas() {
    this.VerDetalles = false;
    this.http.get("http://" + this.ip + "/APIREST/Venta/listVentas.php")
      .subscribe(
        (res) => {
          this.VerVentas = true;
          console.log(res);
          this.ListaVenta = res;
        },
        (error) => {
          console.log(error);
        });
  }

  verDetalles(id_venta: number) {
    this.http.get("http://" + this.ip + "/APIREST/DetVenta/listDetVenta.php?id_venta=" + id_venta)
      .subscribe(
        (res) => {
          console.log(res);
          this.VerListaDetalles = res;
          this.VerDetalles = true;
          this.VerVentas = false;
        },
        (error) => {
          console.log(error);
        });
  }

  EliminarDetalle(id_detalle: number) {
    this.http.get("http://" + this.ip + "/APIREST/DetVenta/delDetVenta.php?id_detalle=" + id_detalle)
      .subscribe(
        (res) => {
          console.log(res);
          let result: any;
          result = res;
          this.verDetalles(result.ventaID);
        },
        (error) => {
          console.log(error);
        }
      )
  }

}
