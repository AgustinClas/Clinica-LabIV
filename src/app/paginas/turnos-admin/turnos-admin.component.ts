import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from 'src/app/servicios/auth-firebase.service';
import { DataStorageServiceService } from 'src/app/servicios/data-storage-service.service';

@Component({
  selector: 'app-turnos-admin',
  templateUrl: './turnos-admin.component.html',
  styleUrls: ['./turnos-admin.component.css']
})
export class TurnosAdminComponent implements OnInit {

  turnos:any = [];
  turnosParaMostrar:any = [];
  CancelarForm = false;

  turnoElegido:any;
  comentario="";
  busqueda:string="";

  constructor(private dataStorage:DataStorageServiceService, private auth:AuthFirebaseService) { }

  ngOnInit(): void {
    this.GetTurnos();
  }

  async GetTurnos(){
    this.dataStorage.GetTurnosAdmin(this.turnos);
    this.turnosParaMostrar = this.turnos
  }

  CancelarTurnoForm(turno : any){
    this.CancelarForm = true;
    this.turnoElegido = turno;
  }

  CancelarTurno(){
    this.dataStorage.ActualizarTurno(this.turnoElegido.id, this.comentario, "canceladoAdm");
    this.turnoElegido.estado = "canceladoAdm";
    this.turnoElegido.comentario = this.comentario;
    this.CancelarForm = false;
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
        return element.especialidad.toLowerCase().includes(palabra) || element.paciente.toLowerCase().includes(palabra) || element.especialista.toLowerCase().includes(palabra)
      })

      console.log(this.turnosParaMostrar)
    }
  }


}
