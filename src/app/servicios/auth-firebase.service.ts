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
  usuario:any;
  email:any;

  constructor(private auth:AngularFireAuth, private dataStorage:DataStorageServiceService) { 
    
  }

  public async authenticate(usr?:string) {

console.log(usr);
    if(usr)
    await this.dataStorage.GetUsuario(usr).then(e => e.get().pipe().subscribe(res => {
      this.usuario = res.data();
      console.log(this.usuario);
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
    this.auth.sendSignInLinkToEmail(mail, setting);
  }

  obtenerUsuarioLogueado(){
    return this.auth.authState
  }

  cerrarSesion(){
    this.auth.signOut();
  }


  
}
