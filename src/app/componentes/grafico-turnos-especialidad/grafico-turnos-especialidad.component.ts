import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DataStorageServiceService } from 'src/app/servicios/data-storage-service.service';
import * as XLSX from "xlsx";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-grafico-turnos-especialidad',
  templateUrl: './grafico-turnos-especialidad.component.html',
  styleUrls: ['./grafico-turnos-especialidad.component.css']
})
export class GraficoTurnosEspecialidadComponent implements OnInit {
  
  arrayEspecialidades:string[] = []
  arrayCantidades:number[] = []
  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [ {
      data: []
    } ]
  };


  constructor(private dataStorage : DataStorageServiceService) { }

  ngOnInit(): void {
    this.dataStorage.GetCantidadTurnos().subscribe(
      element => { 

        this.arrayEspecialidades = []
        this.arrayCantidades = []

        if(element.docs){
          element.docs.forEach( (obj) => {
            let auxTurno:any = obj.data();

            if(this.arrayEspecialidades.includes(auxTurno.especialidad)){
              for(let i = 0; i < this.arrayEspecialidades.length; i++){
                if(this.arrayEspecialidades[i] == auxTurno.especialidad){
                  this.arrayCantidades[i] = this.arrayCantidades[i] + 1;
                } 
              }
            }
            else{
              this.arrayEspecialidades.push(auxTurno.especialidad);
              this.arrayCantidades.push(1);
            }

          }
        )
        }


        this.pieChartData = {
          labels: this.arrayEspecialidades,
          datasets: [ {
            data: this.arrayCantidades
          } ]
        };
      }
    )
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      }
    }
  };

  public pieChartType: ChartType = 'pie';

  DescargarInfo(){
    let data:any = [];

    for(let i = 0; i < this.arrayEspecialidades.length; i++){

      let obj = {
        "especialidad" : this.arrayEspecialidades[i],
        "cantidad": this.arrayCantidades[i]
      }

      data.push(obj);
    }

    var ws = XLSX.utils.json_to_sheet(data);
    
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "turnosPorEspecialidad");
    
    XLSX.writeFile(wb, "turnosPorEspecialidad" +  ".xlsx");
  
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


