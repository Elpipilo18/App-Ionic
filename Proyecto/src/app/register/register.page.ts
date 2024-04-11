import { Component, OnInit } from '@angular/core';
import { Usuario } from '../Model/Usuario';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  ip !: string;

  //atributos del usuario
  username !: string;
  email !: string;
  password!: string;
  name !: string;
  ap_paterno!: string;
  ap_materno!: string;

  ServerResponse !: string;
  Exito !: boolean;


  constructor(public http: HttpClient, public router: Router) {
    this.ip = 'richiapi.x10.mx';
    //this.ip = '127.0.0.1';
    this.Exito = false;
  }
  ngOnInit() {
  }
  RegisterForm() {
    let usuario = new Usuario(this.username, this.email, this.password, this.name, this.ap_paterno, this.ap_materno);
    this.http.post("http://" + this.ip + "/APIREST/forms/register.php", usuario)
      .subscribe(
        (res) => {
          this.ValidateResponse(res);
        },
        (error) => {
          console.log(error);
        });
  }

  ValidateResponse(Response: any) {
    console.log(Response);
    if (Response.estado) {
      this.Exito = Response.estado;
      this.ServerResponse = Response.message;
      setTimeout(() => {
        this.Exito = false;
        this.router.navigate(['/login']);
      }, 2000);
    }
  }


}
