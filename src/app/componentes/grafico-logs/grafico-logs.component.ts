import { Component, OnInit } from '@angular/core';
import { throws } from 'assert';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DataStorageServiceService } from 'src/app/servicios/data-storage-service.service';
import * as XLSX from "xlsx";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-grafico-logs',
  templateUrl: './grafico-logs.component.html',
  styleUrls: ['./grafico-logs.component.css']
})
export class GraficoLogsComponent implements OnInit {

  logs:any = [];
  cantidadLogs:number[] = [0,0,0,0,0,0,0,0,0,0];
  arrayFechas:Date[] = [];
  arrayFechasString:string[] = [];
  public lineChartData: ChartConfiguration['data'] = {

    datasets: [
      {
        data: this.cantidadLogs,
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: this.arrayFechasString

  };
  
  constructor(private dataStorage:DataStorageServiceService) { }

  ngOnInit(): void {

    let fechaHoy:Date = new Date();
    fechaHoy.setHours(0);
    fechaHoy.setMinutes(0);
    fechaHoy.setSeconds(0);
    fechaHoy.setMilliseconds(0);

    fechaHoy.setDate(fechaHoy.getDate() - 10);
    
    for(let i = 0; i < 10; i++){
      fechaHoy.setDate(fechaHoy.getDate() + 1);
      let fecha = new Date(fechaHoy)
      
      this.arrayFechas.push(fecha);
    }

    this.arrayFechas.forEach((element) => {
      this.arrayFechasString.push(element.toLocaleDateString())
    })

    
    this.dataStorage.GetLogs().subscribe(
      prod => {this.logs = prod;
        this.cantidadLogs = [0,0,0,0,0,0,0,0,0,0];
        this.logs.forEach((element:any) => {
          let auxFecha:Date =  new Date(element.hora.seconds * 1000);
          auxFecha.setHours(0);
          auxFecha.setMinutes(0);
          auxFecha.setSeconds(0);
          auxFecha.setMilliseconds(0);
          
          for(let i = 0; i < 10; i++){ 
            
            if(auxFecha.toDateString() == this.arrayFechas[i].toDateString()){
              this.cantidadLogs[i] = this.cantidadLogs[i] + 1;
            }            
          }
        });

        this.lineChartData = {
        datasets: [
          {
            data: this.cantidadLogs,
            label: 'Cantidad de logs',
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            fill: 'origin',
          }
        ],
        labels: this.arrayFechasString
      };

      }

      )   
  }


  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
        {
          position: 'left',
        },
      'y-axis-1': {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        }
      }
    }
  };

  public lineChartType: ChartType = 'line';

  DescargarInfo(){
    let data:any = [];

    for(let i = 0; i < this.arrayFechasString.length; i++){

      let obj = {
        "fecha" : this.arrayFechasString[i],
        "cantidad": this.cantidadLogs[i]
      }

      data.push(obj);
    }

    var ws = XLSX.utils.json_to_sheet(data);
    
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "cantidadLogs");
    
    XLSX.writeFile(wb, "cantidadLogs" +  ".xlsx");
  
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
