import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from 'src/app/servicios/auth-firebase.service';
import { DataStorageServiceService } from 'src/app/servicios/data-storage-service.service';


@Component({
  selector: 'app-mis-turnos-paciente',
  templateUrl: './mis-turnos-paciente.component.html',
  styleUrls: ['./mis-turnos-paciente.component.css']
})
export class MisTurnosPacienteComponent implements OnInit {

  turnos:any = [];
  turnosParaMostrar:any = [];
  CancelarForm = false;
  ComentarioForm = false;
  reseniaForm = false;
  CalificarForm = false;

  turnoElegido:any;
  comentario="";
  busqueda:string="";

  constructor(private dataStorage:DataStorageServiceService, private auth:AuthFirebaseService) { }

  ngOnInit(): void {
    this.GetTurnos();
  }

  async GetTurnos(){

    this.dataStorage.GetTurnos(this.auth.usuario.mail, this.turnos);
    this.turnosParaMostrar = this.turnos;
  }

  CancelarTurnoForm(turno : any){
    this.CancelarForm = true;
    this.turnoElegido = turno;
  }

  CancelarTurno(){
    this.dataStorage.ActualizarTurno(this.turnoElegido.id, this.comentario, "canceladoPac");
    this.turnoElegido.estado = "canceladoPac";
    this.turnoElegido.comentario = this.comentario;
    this.CancelarForm = false;
    this.comentario = "";
  }

  MostrarComentarioForm(turno:any, opcion:boolean){
    this.ComentarioForm = opcion;
    this.turnoElegido = turno;
  }



  MostrarReseniaForm(opcion:boolean, turno:any){
    this.reseniaForm = opcion;
    this.turnoElegido = turno;
  }

  MostrarCalificarForm(turno:any){
    this.CalificarForm = true;
    this.turnoElegido = turno;
  }
  
  CalificarAtencion(){
    this.dataStorage.ActualizarTurno(this.turnoElegido.id, this.comentario, this.turnoElegido.estado);
    this.turnoElegido.comentario = this.comentario;
    this.CalificarForm = false;
    this.comentario = "";
  }

  BuscarTurnos(){

    console.log(this.busqueda);
    if(this.busqueda == "") this.turnosParaMostrar = this.turnos
    else{
      let palabra = this.busqueda.toLowerCase();
      console.log(palabra);
      this.turnosParaMostrar = this.turnos;

      this.turnosParaMostrar = this.turnosParaMostrar.filter((element:any) => {
        console.log("Acaaaaaa");
        return element.especialidad.toLowerCase().includes(palabra) || element.especialista.toLowerCase().includes(palabra) || this.BuscarTurnoEnHistoria(palabra, element.historia) 
      })

      console.log(this.turnosParaMostrar)
    }
  }

  BuscarTurnoEnHistoria(palabra:string, historia:any) :boolean {

    let flag = false;

    if(historia != undefined){ 
      if(historia.altura.toLowerCase().includes(palabra) || historia.especialidad.toLowerCase().includes(palabra) || historia.peso.toLowerCase().includes(palabra) || historia.temperatura.toLowerCase().includes(palabra)) return true

      if(historia.camposDinamicos != undefined)
      historia.camposDinamicos.forEach((element:any) => {
        if(element.campo.toLowerCase().includes(palabra) || element.valor.toLowerCase().includes(palabra)) flag = true
      })

      return flag;
    }

    return false;
  }

}
