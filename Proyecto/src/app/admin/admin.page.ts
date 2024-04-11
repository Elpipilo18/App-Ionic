import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  
  ip !: string;
  months: any;
  VentasDiarias: any;
  VentasMensuales: any;


  constructor(public router: Router,public http: HttpClient) {
    this.ip = 'richiapi.x10.mx';
    this.DailyIncome();
    this.MonthlyIncome();
    this.months =
      ["Enero", "Febrero", "Marzo", "Abril", "Mayo",
        "Junio", "Julio", "Agosto", "Septiembre",
        "Octubre", "Noviembre", "Diciembre"
      ];
    this.VentasMensuales = [];
    this.VentasDiarias = [];
  }

  ngOnInit() {
    let usuario = sessionStorage.getItem('user');
    let usuarioID = sessionStorage.getItem('usuario ID');
    console.log("Usuario ID ", usuarioID);
    console.log("Usuario", usuario);
  }

  DailyIncome() {
    this.http.get("http://" + this.ip + "/APIREST/Venta/ingresos.php")
      .subscribe(
        (res) => {
          this.VentasDiarias = res;
        },
        (err) => {
          console.log(err);
        }

      )
  }
  MonthlyIncome() {
    this.http.get("http://" + this.ip + "/APIREST/Venta/ingresosMensuales.php")
      .subscribe(
        (res) => {
          this.VentasMensuales = res;

        },
        (err) => {
          console.log(err);
        }

      )
  }
  //sfhvY5QEmCZa3rRAqz8m
  GetMonth(month: number) {
    return this.months[month - 1];
  }

  CerrarSesion() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('usuario ID');
    this.router.navigate(['/']);
  }

}
