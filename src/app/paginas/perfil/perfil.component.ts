import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from 'src/app/servicios/auth-firebase.service';
import { DataStorageServiceService } from 'src/app/servicios/data-storage-service.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  historias:any = [];

  constructor(public auth:AuthFirebaseService, public DataStorage:DataStorageServiceService) { 
    
  }
    
  CambiarEstadoTrabajo(dia:string, trabaja:boolean){

    this.auth.usuario.diasAtencion.forEach((element:any) => {
      if(element.dia == dia) element.trabaja = trabaja;
      console.log(element)
    });

  }

  ActualizarHorarios(){
    this.DataStorage.ActualizarDiasTrabajo(this.auth.usuario.mail, this.auth.usuario.diasAtencion)
  }

  ngOnInit(): void {
    this.DataStorage.GetHistoriasPorPaciente(this.auth.usuario.mail, this.historias);
  }
}
