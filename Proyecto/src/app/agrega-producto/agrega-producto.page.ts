import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Articulo } from '../Model/Articulo';

@Component({
  selector: 'app-agrega-producto',
  templateUrl: './agrega-producto.page.html',
  styleUrls: ['./agrega-producto.page.scss'],
})
export class AgregaProductoPage implements OnInit {

  ip !: string;

  nombre !: string;
  tipo !: string;
  precio !: number;
  existencias !: number;


  constructor(public http: HttpClient) {
    this.ip = 'richiapi.x10.mx';
  }

  ngOnInit() {
  }

  AgregarProducto() {
    const producto = new Articulo(this.nombre, this.tipo, this.existencias, this.precio);
    this.http.post("http://" + this.ip + "/APIREST/addArticulo.php", producto)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {

        }
      )
  }
}
