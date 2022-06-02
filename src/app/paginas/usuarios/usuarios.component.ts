import { Component, OnInit } from '@angular/core';
import { DataStorageServiceService } from 'src/app/servicios/data-storage-service.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  tablaPacienteView:boolean = false;
  tablaEspecialistaView:boolean = false;
  tablaAdminView:boolean = false;

  formView:boolean = false;
  formPacienteView:boolean = false;
  formEspecialistaView:boolean = false;
  formAdminView:boolean = false;

  usuarios:any = [];

  pacientes:any = [];
  especialistas:any = [];
  admins:any = [];

  constructor(private dataStorage:DataStorageServiceService) { }

  ngOnInit(): void {
    
    this.dataStorage.GetUsuarios().subscribe(
      prod => {this.usuarios = prod;
        
        this.pacientes = [];
        this.especialistas = [];
        this.admins = [];
        
        this.usuarios.forEach((user:any) => {
          
          if(user.tipo == "especialista") this.especialistas.push(user);
          else if (user.tipo == "paciente") this.pacientes.push(user);
          else this.admins.push(user);
        });
      }
    )   
  }

  MostrarTabla(tabla:string, opcion:boolean){

    if(tabla == "pacientes") this.tablaPacienteView = opcion;
    else if(tabla == "especialistas") this.tablaEspecialistaView = opcion;
    else if(tabla == "admins") this.tablaAdminView = opcion;
  }

  MostrarForm(form:string){

    if(form == "paciente"){
      this.formView = true;
      this.formPacienteView = true;
      this.formEspecialistaView =false;
      this.formAdminView =false;
    } 
    else if(form == "especialista"){
      this.formView = true;
      this.formPacienteView =false;
      this.formEspecialistaView = true;
      this.formAdminView = false;
    } 
    else if(form == "admin"){
      this.formView = true;
      this.formPacienteView = false;
      this.formEspecialistaView = false;
      this.formAdminView = true;
    } 
  }

  CerrarForm(){
      this.formView = false;
      this.formPacienteView = false;
      this.formEspecialistaView = false;
      this.formAdminView = false;
  }

  ActualizarHabilitacion(especialista:string, habilitacion:boolean){
    this.dataStorage.CambiarHabilitacion(especialista, habilitacion)
  }
}
