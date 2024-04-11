import { Component, OnInit } from '@angular/core';
import { Articulo } from '../Model/Articulo';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.page.html',
  styleUrls: ['./almacen.page.scss'],
})
export class AlmacenPage implements OnInit {
  //ip address 
  ip !: string;

  //list of products
  ProdList: any;

  //server message
  Message: any;

  //show stock
  ListaAlmacen !: boolean;

  //show art info
  ArticuloInfo !: boolean;

  //show
  artId !: number;
  artName !: string;
  artType !: string;
  artStock !: number;
  artPrice !: number;

  //product found
  artFound: any;


  constructor(public http: HttpClient) {
    //this.ip = "my ip";
    this.ip = 'richiapi.x10.mx';
    this.ProdList = [];
    this.ListArticulos();
    this.Message = [];
    this.ListaAlmacen = false;
    this.ArticuloInfo = false;
    this.artFound = [];
  }

  ngOnInit() {
  }

  ListArticulos() {
    this.http.get("http://" + this.ip + "/APIREST/listArticulos.php")
      .subscribe(
        (res) => {
          this.ProdList = res;
          this.ListaAlmacen = true;
        },
        (error) => {
          console.log(error);
        });
  }

  DeleteProduct() {
    this.http.delete("http://" + this.ip + "/APIREST/delArticulo.php?id_articulo=" + this.artId)
      .subscribe(
        (res) => {
          console.log(res);
          this.ListArticulos();
          this.ArticuloInfo = false;
        },
        (error) => {
          console.log(error);
        }
      )
  }

  EditProduct(prod_id: any) {
    this.ListaAlmacen = false;
    this.ArticuloInfo = true;

    this.http.get("http://" + this.ip + "/APIREST/findArticulo.php?id_articulo=" + prod_id)
      .subscribe(
        (res) => {
          console.log(res);
          this.artFound = res;
          this.artId = this.artFound[0].id_articulo
          this.artName = this.artFound[0].articulo;
          this.artType = this.artFound[0].tipo_art;
          this.artStock = this.artFound[0].almacen;
          this.artPrice = this.artFound[0].precio;
        },
        (error) => {
          console.log(error);
        }
      )
  }

  UpdateProdInfo() {
    const updatedProd = new Articulo(this.artName, this.artType, this.artStock, this.artPrice);
    this.http.post("http://" + this.ip + "/APIREST/updArticulo.php?id_articulo=" + this.artId, updatedProd)
      .subscribe(
        (res) => {
          this.ArticuloInfo = false;
          this.ListArticulos();
        },
        (error) => {
          console.log(error);
        });
  }
}
