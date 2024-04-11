import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginDTO } from '../Model/LoginDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario !: string;
  contrasena !: string;
  ip !: string;
  ServerResponse: any;


  constructor(public router: Router, public http: HttpClient) {

    //this.ip = '192.168.0.109';
    this.ip = "richiapi.x10.mx";
    this.ServerResponse = [];
  }

  ngOnInit() {
  }

  Login() {
    const LoginData = new LoginDTO(this.usuario, this.contrasena);

    this.http.post("http://" + this.ip + "/APIREST/forms/login.php", LoginData)
      .subscribe(
        (res) => {
          console.log(res);
          this.ServerResponse = res;
          this.ValidateResponse(this.ServerResponse);
        },
        (err) => {
          this.ServerResponse = err;
          console.log(this.ServerResponse);
        }
      );
  }

  ValidateResponse(Response: any) {
    //check the rol id to redirect to the correct page
    let id_rol = Response.rol;  // getting the rol id from the response
    let id_user = Response.id_usuario; // getting the user id
    sessionStorage.setItem('user', Response.usuario);
    sessionStorage.setItem('usuario ID', id_user);

    //validating rol
    switch (id_rol) {
      case '1':
        this.router.navigate(['/admin']);
        break;
      case '2':
        this.router.navigate(['/cliente']);
        break;
      default:
        break;
    }

  }


}
