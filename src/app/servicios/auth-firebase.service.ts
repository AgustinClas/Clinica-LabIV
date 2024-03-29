import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireAuth  } from '@angular/fire/compat/auth';
import { throws } from 'assert';
import { BehaviorSubject } from 'rxjs';
import { AppRoutingModule } from '../app-routing.module';
import { DataStorageServiceService } from './data-storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {
  
  authenticated$ = new BehaviorSubject(false);
  
  /*usuario:any = {
    "nombre": "Lio",
    "contrasenia": "123456",
    "img1": "https://firebasestorage.googleapis.com/v0/b/clinica-labiv.appspot.com/o/usuarios%2Flapulguitamessi%40gmail.comimg1?alt=media&token=8a08901e-89d6-47df-a627-1e938efb6ae9",
    "mail": "lapulguitamessi@gmail.com",
    "tipo": "paciente",
    "edad": "34",
    "obraSocial": "Galeno",
    "img2": "https://firebasestorage.googleapis.com/v0/b/clinica-labiv.appspot.com/o/usuarios%2Flapulguitamessi%40gmail.comimg2?alt=media&token=f4c602ea-4aac-407d-b166-cfa381f1b7a0",
    "apellido": "Messi",
    "dni": "28555444"
  };*/

  usuario:any /*= {
    "contrasenia": "123456",
    "activado": true,
    "nombre": "German",
    "apellido": "Diaz",
    "edad": "50",
    "dni": "43123987",
    "diasAtencion": [
        {
            "especialidad": "Oculista",
            "trabaja": false,
            "entrada": "11",
            "salida": "14",
            "dia": "lunes"
        },
        {
            "especialidad": "Oculista",
            "entrada": "8",
            "dia": "martes",
            "trabaja": false,
            "salida": "18"
        },
        {
            "trabaja": false,
            "dia": "miercoles",
            "especialidad": "Oculista",
            "entrada": "8",
            "salida": "18"
        },
        {
            "entrada": "8",
            "dia": "jueves",
            "trabaja": false,
            "especialidad": "Oculista",
            "salida": "18"
        },
        {
            "especialidad": "Oculista",
            "salida": "16",
            "trabaja": true,
            "entrada": "10",
            "dia": "viernes"
        },
        {
            "dia": "sabado",
            "entrada": "8",
            "trabaja": false,
            "especialidad": "Oculista",
            "salida": "18"
        }
    ],
    "tipo": "especialista",
    "mail": "germandiaz@gmail.com",
    "img1": "https://firebasestorage.googleapis.com/v0/b/clinica-labiv.appspot.com/o/usuarios%2Fgermandiaz%40gmail.comimg1?alt=media&token=f40d6f2b-4acb-40bf-a338-9637798b8990",
    "especialidad": "Oculista"
}*/
  email:any;

  constructor(private auth:AngularFireAuth, private dataStorage:DataStorageServiceService) { 
    
  }

  public async authenticate(usr?:string) {

    if(usr)
    await this.dataStorage.GetUsuario(usr).then(e => e.get().pipe().subscribe(res => {
      this.usuario = res.data();
    }));
  }
  
  public async authenticateState(){
    this.authenticated$.next(true);
  }

  public deauthenticate() {
    this.authenticated$.next(false);
    this.usuario = null;
  }


  async iniciarSesion(email:string, password:string){
    
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  async registrar(email:string, password:string){

    return this.auth.createUserWithEmailAndPassword(email, password);

  }


  async sendVerificationEmail(mail:string): Promise<void> {

    const setting = {
      url: 'http://localhost:4200/home',
      handleCodeInApp:true
    }
    console.log(mail);
    this.auth.currentUser.then(obj => obj?.sendEmailVerification)
  }

  obtenerUsuarioLogueado(){
    return this.auth.authState
  }

  cerrarSesion(){
    this.auth.signOut();
  }


  
}
