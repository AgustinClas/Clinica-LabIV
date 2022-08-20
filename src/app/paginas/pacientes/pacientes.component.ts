import { Component, OnInit } from '@angular/core';
import { DataStorageServiceService } from 'src/app/servicios/data-storage-service.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  usuarioElegidoVw:boolean = false;
  usuarioElegido:string = "";
  usuarios:Array<any> = [];
  historias:any = [];
  historiasTop3:any = [];
  historiasParaMostrar:any = [];

  constructor(private dataStorage:DataStorageServiceService) { }

  ngOnInit(): void {

    this.dataStorage.GetHistoriasPorEspecialista("germandiaz@gmail.com", this.historias, this.usuarios, this.historiasTop3);
  }

  ElegirUsuario(mail:string){
    
    this.historiasParaMostrar = this.historias.filter((obj:any) => {
      return obj.paciente == mail
    })

    console.log(this.historiasParaMostrar);
    this.usuarioElegido = mail;
    this.usuarioElegidoVw = true;
  }

  QuitarUsuarioElegido(){
    this.usuarioElegidoVw = false;
    this.usuarioElegido= "";
    this.historiasParaMostrar = [];
  }

  abc(){
    console.log(this.usuarios);
  }
}
