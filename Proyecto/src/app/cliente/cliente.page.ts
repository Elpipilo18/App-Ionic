import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {
  ip !: string;

  usuario: any;
  id_usuario: any;

  VerCompras !: boolean;
  VerCarrito !: boolean;
  VerProductos!: boolean;

  Carrito: any;
  ListaCompras: any;
  ListaProductos: any;

  TotalCarrito !: number;

  Existe !: boolean;


  ServerResponse: any;

  constructor(public http: HttpClient, public router: Router) {
    this.Carrito = [];
    this.ListaCompras = [];
    this.ListaProductos = [];

    this.Existe = false;

    this.ip = "richiapi.x10.mx";

    this.TotalCarrito = 0;

    this.VerCompras = false;
    this.VerCarrito = false;
    this.VerProductos = true;

    this.ServerResponse = [];

    if (sessionStorage.getItem('user') == null && sessionStorage.getItem('usuario ID') == null) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.id_usuario = sessionStorage.getItem('usuario ID');
    this.usuario = sessionStorage.getItem('user');
    console.log(this.id_usuario);
    console.log(this.usuario);
    this.ListarProductos();
  }

  CerrarSesion() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('usuario ID');
    this.router.navigate(['/']);
  }

  ListarProductos() {
    this.VerProductos = true;
    this.VerCarrito = false;
    this.VerCompras = false;

    this.http.get('http://' + this.ip + '/APIREST/listArticulos.php')
      .subscribe(
        (res) => {
          console.log(res);
          this.ListaProductos = res;
        },
        (error) => {
          console.log(error);
        }
      )
  }

  VaciarCarrito() {
    this.Carrito = [];
    this.VerCarrito = false;
    this.VerProductos = false;
    this.VerCompras = false;
    this.Existe = false;

    this.TotalCarrito = 0;
  }

  AgregarDetalle(id_articulo: number) {
    this.http.get("http://" + this.ip + "/APIREST/findArticulo.php?id_articulo=" + id_articulo)
      .subscribe(
        (res) => {
          let art: any;
          art = res;
          const detalle = {
            id_articulo: art[0].id_articulo,
            articulo: art[0].articulo,
            precio: art[0].precio,
            cantidad: 1,
            subtotal: parseFloat(art[0].precio),
            archivo_img: art[0].archivo_img
          }
          this.Existe = false;
          for (let art of this.Carrito) {
            if (art.id_articulo === detalle.id_articulo) {
              this.Existe = true;
              art.cantidad += 1;
              art.subtotal += parseFloat(art.precio);
              this.TotalCarrito += parseFloat(art.precio);
            }
          }
          if (!this.Existe) {
            this.Carrito.push(detalle);
            this.TotalCarrito += detalle.subtotal;
            console.log(this.Carrito);
          }
        },
        (error) => {
          console.log(error);
        });
  }
  EliminaDetalleCarrito(indice_detalle: number) {
    for (let item of this.Carrito) {
      if (item.id_articulo == indice_detalle) {
        this.TotalCarrito -= item.subtotal;
      }
    }
    this.Carrito = this.Carrito.filter((detalle: { id_articulo: number }) => detalle.id_articulo !== indice_detalle);
  }


  VerMiCarrito() {
    this.VerCarrito = true;
    this.VerCompras = false;
    this.VerProductos = false;
    console.log(this.Carrito);
    return this.Carrito;
  }

  Comprar() {
    this.http.post("http://" + this.ip + "/APIREST/DetVenta/addDetVenta.php?id_usuario=" + this.id_usuario, this.Carrito)
      .subscribe(
        (res) => {
          console.log(res);
          this.ListarProductos();
          this.ServerResponse = res;
          //alert(this.ServerResponse.mensaje);
          this.VaciarCarrito();
        },
        (error) => {
          console.log(error);
        });
  }


  VerMisCompras() {
    this.VerCompras = true;
    this.VerCarrito = false;
    this.VerProductos = false;
    this.http.get("http://" + this.ip + "/APIREST/DetVenta/listMisCompras.php?id_usuario=" + this.id_usuario)
      .subscribe(
        (res) => {
          console.log(res);
          this.ListaCompras = res;
        },
        (error) => {
          console.log(error);
        });
  }

  OcultaHistorial() {
    this.VerCompras = false;
  }

}
