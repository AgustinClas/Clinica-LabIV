import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from 'src/app/servicios/auth-firebase.service';
import { DataStorageServiceService } from 'src/app/servicios/data-storage-service.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  historias:any = [];
  especialidadElegida:String = "";

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

    createTablePDF () {

      let contadorLinea = 35
      const doc = new jsPDF( 'landscape', 'px', 'a3' );
      const image = new Image();
      image.src = "../../../assets/AC.png";
      const fecha = (new Date()).toLocaleString();
      doc.addImage( image, 'PNG', 700, 10, 150, 150 );
      doc.text( "Fecha Emisión: " + fecha + "\n", 60, contadorLinea);

      contadorLinea += 14
      
      this.historias.forEach((element:any) => {
        contadorLinea += 30
        doc.text("-------------------------------------------------------------------------------------" + "\n", 60, contadorLinea);
        contadorLinea += 14
        doc.text("Fecha: " + element.fecha.toLocaleString() + "\n", 60,contadorLinea)
        contadorLinea += 14
        doc.text("Especialidad: " + element.especialidad + "\n", 60,contadorLinea)
        contadorLinea += 14
        doc.text("Especialista: " + element.especialista + "\n", 60,contadorLinea)
        contadorLinea += 14
        doc.text("Altura: " + element.altura  +"\n", 60, contadorLinea);
        contadorLinea += 14
        doc.text("Peso: " + element.peso + "\n", 60, contadorLinea);
        contadorLinea += 14
        doc.text("Temperatura: " + element.temperatura + "\n", 60, contadorLinea);
        contadorLinea += 14
        doc.text("Presion: " + element.presion + "\n", 60, contadorLinea);
          if(element.camposDinmaicos != undefined)
            element.camposDinamicos.forEach((element:any) => {
              contadorLinea += 14
              doc.text(element.campo + ": " + element.valor + "\n", 60,contadorLinea)
            })

      });

      doc.save( "perfil" );


    }
    
    createTablePDFPorEspecialidad () {

      let contadorLinea = 35
      const doc = new jsPDF( 'landscape', 'px', 'a3' );
      const image = new Image();
      image.src = "../../../assets/AC.png";
      const fecha = (new Date()).toLocaleString();
      doc.addImage( image, 'PNG', 700, 10, 150, 150 );
      doc.text( "Fecha Emisión: " + fecha + "\n", 60, contadorLinea);

      contadorLinea += 14

      let historiasAux = this.historias.filter((element:any) => {
        return element.especialidad.toLowerCase().includes(this.especialidadElegida.toLowerCase())
      })
      
      historiasAux.forEach((element:any) => {
        contadorLinea += 30
        doc.text("-------------------------------------------------------------------------------------" + "\n", 60, contadorLinea);
        contadorLinea += 14
        doc.text("Fecha: " + element.fecha.toLocaleString() + "\n", 60,contadorLinea)
        contadorLinea += 14
        doc.text("Especialista: " + element.especialista + "\n", 60,contadorLinea)
        contadorLinea += 14
        doc.text("Altura: " + element.altura  +"\n", 60, contadorLinea);
        contadorLinea += 14
        doc.text("Peso: " + element.peso + "\n", 60, contadorLinea);
        contadorLinea += 14
        doc.text("Temperatura: " + element.temperatura + "\n", 60, contadorLinea);
        contadorLinea += 14
        doc.text("Presion: " + element.presion + "\n", 60, contadorLinea);
          if(element.camposDinmaicos != undefined)
            element.camposDinamicos.forEach((element:any) => {
              contadorLinea += 14
              doc.text(element.campo + ": " + element.valor + "\n", 60,contadorLinea)
            })

      });

      doc.save( "perfil" );
      
    }
  }
  
  /*       autoTable(doc, {
          head: [['Name', 'Email', 'Country']],
          body: [
            ['David', 'david@example.com', 'Sweden'],
            ['Castille', 'castille@example.com', 'Spain'],
            // ...
          ],
        }) */