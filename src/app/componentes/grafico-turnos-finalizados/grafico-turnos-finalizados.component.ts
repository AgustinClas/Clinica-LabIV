import { Component, OnInit, ViewChild } from '@angular/core';
import { throws } from 'assert';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DataStorageServiceService } from 'src/app/servicios/data-storage-service.service';
import * as XLSX from "xlsx";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-grafico-turnos-finalizados',
  templateUrl: './grafico-turnos-finalizados.component.html',
  styleUrls: ['./grafico-turnos-finalizados.component.css']
})
export class GraficoTurnosFinalizadosComponent implements OnInit {

  arrayEspecialistas:string[] = [];
  arrayCantidades:number[] = []

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    plugins: {
      legend: {
        display: true,
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: [ ],
    datasets: [
      { data: [  ], label: 'Cantidad de turnos' },
    ]
  };

  constructor(private dataStorage : DataStorageServiceService) { }

  ngOnInit(): void {
    this.dataStorage.GetCantidadTurnosFinalizados().subscribe(
      element => { 

        this.arrayEspecialistas = []
        this.arrayCantidades = []

        if(element.docs){
          let fechaHoy:Date = new Date();
          let fechaDiezDias:Date = new Date();
          fechaDiezDias.setDate(fechaHoy.getDate() - 10);


          element.docs.forEach( (obj) => {
            let auxTurno:any = obj.data();
            let auxFechaTurno:Date = new Date(auxTurno.fecha.seconds * 1000)

            if(auxFechaTurno.getTime() > fechaDiezDias.getTime() && auxFechaTurno.getTime() < fechaHoy.getTime() ){ 
              if(this.arrayEspecialistas.includes(auxTurno.especialista)){

                for(let i = 0; i < this.arrayEspecialistas.length; i++){

                  if(this.arrayEspecialistas[i] == auxTurno.especialista){
                    this.arrayCantidades[i] = this.arrayCantidades[i] + 1;
                  } 
                }
              }

              else{
                this.arrayEspecialistas.push(auxTurno.especialista);
                this.arrayCantidades.push(1);
              }
            }
          }
          )
        }
        
        this.barChartData = {
          labels: this.arrayEspecialistas,
          datasets: [
            { data: this.arrayCantidades, label: 'Cantidad de turnos' },
          ]
        };
      }
    )
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  DescargarInfo(){
    let data:any = [];

    for(let i = 0; i < this.arrayEspecialistas.length; i++){

      let obj = {
        "especialista" : this.arrayEspecialistas[i],
        "cantidad": this.arrayCantidades[i]
      }

      data.push(obj);
    }

    var ws = XLSX.utils.json_to_sheet(data);
    
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "turnosFinalizados");
    
    XLSX.writeFile(wb, "turnosFinalizados" +  ".xlsx");
  
  }

  descargarPDF( id : string, nombre : string ) {
    // printDiv is the html element which has to be converted to PDF
   const element = document.querySelector("#" + id) as HTMLElement;

   if( !element ) return

   html2canvas( element ).then((canvas : any) => {
    var pdfFile = new jsPDF('l', 'px', "a4");
    var imgData  = canvas.toDataURL("image/jpeg", 1.0);
    const image = new Image();
    image.src = "../../../assets/AC.png";
    const fecha = (new Date()).toLocaleString();
    pdfFile.addImage( image, 'PNG', 400, 10, 50, 50 );
    pdfFile.text( "Fecha Emisión: " + fecha + "\n", 60, 30);
   pdfFile.addImage(imgData,0,60,canvas.width, canvas.height * 0.6);
   pdfFile.save(nombre + '.pdf');
   });
    
 }
  
}
