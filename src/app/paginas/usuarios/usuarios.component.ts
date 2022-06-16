import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DataStorageServiceService } from 'src/app/servicios/data-storage-service.service';
import * as XLSX from "xlsx"

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  tablaPacienteView:boolean = false;
  tablaEspecialistaView:boolean = false;
  tablaAdminView:boolean = false;
  historiasView:boolean = false;

  formView:boolean = false;
  formPacienteView:boolean = false;
  formEspecialistaView:boolean = false;
  formAdminView:boolean = false;

  usuarios:any = [];

  pacientes:any = [];
  especialistas:any = [];
  admins:any = [];
  historias:any = [];

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

    if(tabla == "pacientes"){  
      this.tablaPacienteView = opcion; 
      if(!opcion) this.historiasView = false;
    }
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

  DescargarXLSX(){

    var data:any = [];

    this.usuarios.forEach((element:any) => {
      let user = {
        "nombre": element.nombre, 
        "apellido": element.apellido,
        "mail": element.mail,
        "dni": element.dni,
        "edad": element.edad,
        "tipo": element.tipo
      }

      data.push(user);
    })

    /* generate a worksheet */
    var ws = XLSX.utils.json_to_sheet(data);
  
    /* add to workbook */
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Usuarios");
  
    /* write workbook and force a download */
      XLSX.writeFile(wb, "Usuarios.xlsx");
  }

  ActualizarHabilitacion(especialista:string, habilitacion:boolean){
    this.dataStorage.CambiarHabilitacion(especialista, habilitacion)
  }

  MostrarHistoriaClinica(mail:string){
    this.historias = [];
    this.dataStorage.GetHistoriasPorPaciente(mail, this.historias);
    this.historiasView = true;
  }
}
