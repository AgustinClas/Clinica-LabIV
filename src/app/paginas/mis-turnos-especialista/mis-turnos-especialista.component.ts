import { Component, OnInit } from '@angular/core';
import { title } from 'process';
import { AuthFirebaseService } from 'src/app/servicios/auth-firebase.service';
import { DataStorageServiceService } from 'src/app/servicios/data-storage-service.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-mis-turnos-especialista',
  templateUrl: './mis-turnos-especialista.component.html',
  styleUrls: ['./mis-turnos-especialista.component.css']
})
export class MisTurnosEspecialistaComponent implements OnInit {

  turnos:any = [];
  turnosParaMostrar:any = [];
  CancelarForm = false;
  RechazarForm = false;
  ComentarioForm = false;
  reseniaForm = false;
  historiaForm = false;
  cargarReseniaForm = false;

  turnoElegido:any;
  comentario="";
  busqueda:string="";

  constructor(private dataStorage:DataStorageServiceService, private auth:AuthFirebaseService) { }

  ngOnInit(): void {
    this.GetTurnos();
  }

  async GetTurnos(){

    this.dataStorage.GetTurnosPorEspecialista(this.auth.usuario.mail , this.turnos);
    this.turnosParaMostrar = this.turnos
  }

  CancelarTurnoForm(turno : any){
    this.CancelarForm = true;
    this.turnoElegido = turno;
  }

  CancelarTurno(){
    this.dataStorage.ActualizarTurno(this.turnoElegido.id, this.comentario, "canceladoEsp");
    this.turnoElegido.estado = "canceladoEsp";
    this.turnoElegido.comentario = this.comentario;
    this.CancelarForm = false;
    this.comentario = "";

  }

  RechazarTurnoForm(turno : any){
    this.RechazarForm = true;
    this.turnoElegido = turno;
  }

  simpleAlert(){
    Swal.fire('Hello world!');
  }

  RechazarTurno(){
    this.dataStorage.ActualizarTurno(this.turnoElegido.id, this.comentario, "rechazado");
    this.turnoElegido.estado = "rechazado";
    this.turnoElegido.comentario = this.comentario;
    this.RechazarForm = false;
    this.comentario = "";
  }

  AceptarTurno(turno:any){
    this.turnoElegido = turno;
    this.dataStorage.ActualizarTurno(this.turnoElegido.id, this.comentario, "aceptado");
    this.turnoElegido.estado = "aceptado";
  }

  MostrarComentarioForm(turno:any){
    Swal.fire(turno.comentario)
  }

  MostrarReseniaForm(turno:any){
    Swal.fire(turno.resenia);
  }

  CargarReseniaForm(turno : any){
    this.cargarReseniaForm = true;
    this.historiaForm = true;
    this.turnoElegido = turno;
  }

  CerrarHistoriaForm(){
    this.historiaForm = false;
    this.turnoElegido.estado = "finalizado";
    this.dataStorage.ActualizarTurno(this.turnoElegido.id, this.turnoElegido.comentario, "finalizado");
  }

  CargarReseniaTurno(){
    this.dataStorage.ActualizarTurnoResenia(this.turnoElegido.id, this.comentario, "finalizado");
    this.turnoElegido.resenia = this.comentario;
    this.cargarReseniaForm = false;
    this.comentario = "";
  }

  BuscarTurnos(){

    if(this.busqueda == "") this.turnosParaMostrar = this.turnos
    else{
      let palabra = this.busqueda.toLowerCase();
      this.turnosParaMostrar = this.turnos;

      this.turnosParaMostrar = this.turnosParaMostrar.filter((element:any) => {
        return element.especialidad.toLowerCase().includes(palabra) || element.paciente.toLowerCase().includes(palabra) || this.BuscarTurnoEnHistoria(palabra, element.historia)
      })

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
