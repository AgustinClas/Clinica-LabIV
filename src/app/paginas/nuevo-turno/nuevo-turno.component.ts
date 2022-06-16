import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFirebaseService } from 'src/app/servicios/auth-firebase.service';
import { DataStorageServiceService } from 'src/app/servicios/data-storage-service.service';

@Component({
  selector: 'app-nuevo-turno',
  templateUrl: './nuevo-turno.component.html',
  styleUrls: ['./nuevo-turno.component.css']
})
export class NuevoTurnoComponent implements OnInit {

  nivelesVista = {especialidad: false, especialistas: false, fecha:false, horario:false}

  especialidades:any = [
    {
        "especialidad": "Cardiologia",
        "imagen": "https://firebasestorage.googleapis.com/v0/b/clinica-labiv.appspot.com/o/especialidades%2Fcardiologo.png?alt=media&token=b01f571b-813a-4026-a3d5-debc3fb4b127"
    },
    {
        "imagen": "https://firebasestorage.googleapis.com/v0/b/clinica-labiv.appspot.com/o/especialidades%2Fcuidado-dental.png?alt=media&token=5f491a83-bef7-4ffa-b815-0d4c7d1621a1",
        "especialidad": "Dentista"
    },
    {
        "imagen": "https://firebasestorage.googleapis.com/v0/b/clinica-labiv.appspot.com/o/especialidades%2Foptometrista.png?alt=media&token=c073aa77-f07c-4c7b-ae7f-64561fa7559c",
        "especialidad": "Oculista"
    },
    {
        "imagen": "https://firebasestorage.googleapis.com/v0/b/clinica-labiv.appspot.com/o/especialidades%2Fnutricionista.png?alt=media&token=f1bedcde-25d5-44a5-b7fa-03e2c89c83a1",
        "especialidad": "Nutricion"
    },
    {
        "imagen": "https://firebasestorage.googleapis.com/v0/b/clinica-labiv.appspot.com/o/especialidades%2Fdermatologo.png?alt=media&token=918c3021-fe9f-4924-bf93-2a0d7a65464a",
        "especialidad": "Dermatologia"
    },
    {
        "imagen": "https://firebasestorage.googleapis.com/v0/b/clinica-labiv.appspot.com/o/especialidades%2Fpediatra.png?alt=media&token=67b7f449-07ae-4b98-92c5-e22590be8cef",
        "especialidad": "Pediatria"
    }
  ];
  especialistasAux:any = [];
  especialistas:any = [];
  fechas:any = [];
  horarios:any = [];

  especialidadElegida = "";
  especialistaElegida:any ={};
  fechaElegida:any = "";
  horarioElegido = "";

  constructor(private dataStorage:DataStorageServiceService, private auth:AuthFirebaseService, private ruteo:Router) { }

  ngOnInit(): void {
    /* this.dataStorage.GetEspecialidades().subscribe(
      prod => {this.especialidades = prod;
      }
    )  
    */ 

    this.dataStorage.GetEspecialistas().subscribe(
      prod => {this.especialistasAux = prod;
      }
    )

  }

  ElegirEspecialidad(especialidad:string){

    this.especialistasAux.forEach((element:any) => {
      if(element.especialidad == especialidad) this.especialistas.push(element);
    });

    this.nivelesVista.especialidad = true;
    this.especialidadElegida = especialidad;
  }

  ElegirEspecialista(especialista:any){
    this.especialistaElegida = especialista;
    this.nivelesVista.especialistas = true;
    

    var future = new Date();

    for(let i = 0; i < 15; i++){
      future.setDate(future.getDate() + 1);
      let fecha = new Date(future)

      if(fecha.getDay() == 0 ||
      fecha.getDay() == 1 && !this.especialistaElegida.diasAtencion[0].trabaja ||
      fecha.getDay() == 2 && !this.especialistaElegida.diasAtencion[1].trabaja ||
      fecha.getDay() == 3 && !this.especialistaElegida.diasAtencion[2].trabaja ||
      fecha.getDay() == 4 && !this.especialistaElegida.diasAtencion[3].trabaja ||
      fecha.getDay() == 5 && !this.especialistaElegida.diasAtencion[4].trabaja ||
      fecha.getDay() == 6 && !this.especialistaElegida.diasAtencion[5].trabaja ||
      fecha.getDay() == 7 && !this.especialistaElegida.diasAtencion[6].trabaja
      ) i--;
      else  this.fechas.push(fecha);
    }
  }

  ElegirFecha(fecha:Date){

    this.fechaElegida = fecha;
    this.nivelesVista.fecha = true;

    let day = this.fechaElegida.getDay() - 1;

    fecha.setHours(this.especialistaElegida.diasAtencion[day].entrada);
    fecha.setMinutes(0);
    fecha.setSeconds(0);
    fecha.setMilliseconds(0);

    while(fecha.getHours() < this.especialistaElegida.diasAtencion[day].salida){
    
      let fechaAux = new Date(fecha);

      this.horarios.push(fechaAux)
      
      fecha.setMinutes(fecha.getMinutes() + 30);
    }
  }

  ElegirHorario(fecha:Date){

    let turno = {
      paciente: this.auth.usuario.mail,
      especialista: this.especialistaElegida.mail,
      fecha: fecha,
      especialidad: this.especialidadElegida,
      estado: "pendienteAceptacion",
      resenia: "",
      comentario: ""
    }

    this.dataStorage.GuardarTurno(turno);

    this.ruteo.navigateByUrl("Home");

  }
  
  ActualizarNivel(opcion:number){

    if(0 == opcion ){
      this.nivelesVista.especialidad = false;
      this.especialidadElegida = "";
      this.especialistas = [];

      this.nivelesVista.especialistas = false;
      this.especialistaElegida = "";

      this.nivelesVista.fecha = false;
      this.fechaElegida = "";
      this.fechas = [];

    }

    if(1 == opcion){
      this.nivelesVista.especialistas = false;
      this.especialistaElegida = "";

      this.nivelesVista.fecha = false;
      this.fechaElegida = "";
      this.fechas = [];

      
    }

    if(2 == opcion){

      this.nivelesVista.fecha = false;
      this.fechaElegida = "";
      this.horarios = [];
    }
  }
  
}
