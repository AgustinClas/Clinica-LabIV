import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { Usuario } from '../../Entidades/usuario'
import { Router } from '@angular/router';
import { AuthFirebaseService } from 'src/app/servicios/auth-firebase.service';
import { DataStorageServiceService } from 'src/app/servicios/data-storage-service.service';
import { Console } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  email:string;
  password:string;
  errorInicio:boolean;
  cargando=false;
  captchaMostrado:boolean = false;
  loginUsuario:Usuario = new Usuario();

  constructor(public ruteo:Router, private authService:AuthFirebaseService, private dataStorage:DataStorageServiceService) {
    this.email = "";
    this.password = "";
    this.errorInicio = false;
  }

  ngOnInit(): void {
  }

  redirigir(){
    this.ruteo.navigateByUrl(this.loginUsuario.email);
  }

   async ingresar(){

    try{
       
       await this.authService.iniciarSesion(this.loginUsuario.email, this.loginUsuario.password).then( usr => {

         if(usr.user?.email){ 
            this.authService.authenticate(usr.user?.email);
            
            this.cargando = true;
            setTimeout(() => {
              if(this.authService.usuario.tipo == "especialista" && !this.authService.usuario.activado ){ 
                this.authService.deauthenticate();
                this.cargando = false;
              }
              else
              {
                this.dataStorage.GuardarLog(this.authService.usuario.mail);
                console.log(this.authService.usuario);
                this.ruteo.navigateByUrl("Home");
                this.authService.authenticateState();
              }
          }, 5000)
        
        }}).catch(e => {this.errorInicio = true});
        
    }
    catch(e){
      console.log("Error");
    }
  }

  iniciarSesionAutomaticamente(opcion:number){
    
    switch(opcion){

      case 1: 
        this.loginUsuario.email = "agustiinnclas@gmail.com";
        this.loginUsuario.password = "123456";
        break;
      case 2: 
        this.loginUsuario.email = "lapulguitamessi@gmail.com";
        this.loginUsuario.password = "123456";
        break;
      case 3: 
        this.loginUsuario.email = "carlos-apache@gmail.con";
        this.loginUsuario.password = "123456";
        break;
      case 4: 
        this.loginUsuario.email = "favaloro@acclinica.com";
        this.loginUsuario.password = "123456";
        break;
      case 5: 
        this.loginUsuario.email = "germandiaz@gmail.com";
        this.loginUsuario.password = "123456";
        break;
      case 6: 
        this.loginUsuario.email = "admin@acclinica.com";
        this.loginUsuario.password = "123456"
        break;
    }

  
  }

  MostrarCaptcha(opcion:boolean){
    this.captchaMostrado = opcion;
  }
}
