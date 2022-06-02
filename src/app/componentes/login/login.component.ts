import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { Usuario } from '../../Entidades/usuario'
import { Router } from '@angular/router';
import { AuthFirebaseService } from 'src/app/servicios/auth-firebase.service';
import { DataStorageServiceService } from 'src/app/servicios/data-storage-service.service';

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
                this.ruteo.navigateByUrl("Home");
                this.authService.authenticateState();
              }
          }, 3000)
        
        }}).catch(e => {this.errorInicio = true});
        
    }
    catch(e){
      console.log("Error");
    }
  }

  iniciarSesionAutomaticamente(opcion:number){
    

    if(opcion==1){ 
      this.loginUsuario.email = "agustiinnclas@gmail.com";
      this.loginUsuario.password = "123456";
    }
    else if(opcion==2){
      this.loginUsuario.email = "favaloro@acclinica.com";
      this.loginUsuario.password = "123456";
    }
    else{
      this.loginUsuario.email = "admin@acclinica.com";
      this.loginUsuario.password = "123456"
    }
  
  }

}
