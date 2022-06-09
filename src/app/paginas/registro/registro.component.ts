import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFirebaseService } from 'src/app/servicios/auth-firebase.service';
import { DataStorageServiceService } from 'src/app/servicios/data-storage-service.service';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit  {

  opcion:any = 0;
  formCargado = false;
  paciente:any = {};
  especialista:any = {};
  flagPaciente = false;
  mail = "";
  contrasenia = "";
  especialidades:any = [];

  constructor( public ruteo:Router, private authService:AuthFirebaseService, private dataStorage:DataStorageServiceService ){
  }

  ngOnInit(): void {
    this.dataStorage.GetEspecialidades().subscribe(
      prod => {this.especialidades = prod;
      }
    )     
  }

  MostrarForm(opcionPaciente:boolean){
    if(opcionPaciente) this.opcion = 1;
    else this.opcion = 2;
  }

  CambiarPantalla(){
    this.ruteo.navigateByUrl("verificarMail")
  }

  CargarPaciente(paciente:any){
    this.paciente = paciente
    this.formCargado = true;
    this.flagPaciente = true;
  }

  CargarEspecialista(especialista:any){
    this.especialista = especialista;
    this.formCargado = true;
  }


  MostrarCaptcha(opcion:boolean){
    this.formCargado = opcion;
  }



  Registrar(){

    if(this.flagPaciente){ 
      this.authService.registrar(this.paciente.mail, this.paciente.contrasenia).then(() => {
        console.log("paciente")
        this.dataStorage.GuardarPaciente(this.paciente)
        this.authService.email = this.mail;
      }).catch(e => {
        console.log("Error al iniciar usuario" + e);
        //this.errorRegistro = true;
      })
    }
    else{

      this.authService.registrar(this.especialista.mail, this.especialista.contrasenia).then(() => {

        this.dataStorage.GuardarEspecialista(this.especialista);
  
        let flag = true;
  
        //Verifico si la especialidad se encuentra cargada en la base de datos
        this.especialidades.forEach((esp:any) => {
          if(esp.especialidad == this.especialista.especialidad ) {flag = false; stop;}
        });
        //Si no se encuentra cargada, la cargo en la base de datos
        if(flag) this.dataStorage.GuardarEspecialidad(this.especialista.especialidad)
  
        //this.authService.EnviarEmail();
      }).catch(e => {
        console.log("Error al iniciar usuario" + e);
        //this.errorRegistro = true;
      })
    }


    this.CambiarPantalla();
  }
}
