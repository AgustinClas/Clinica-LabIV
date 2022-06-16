import { Component, OnInit } from '@angular/core';
import * as XLSX from "xlsx"

@Component({
  selector: 'app-mis-turnos-usuario',
  templateUrl: './mis-turnos-usuario.component.html',
  styleUrls: ['./mis-turnos-usuario.component.css']
})
export class MisTurnosUsuarioComponent implements OnInit {

  turnos = [{paciente: "agustiinnclas@gmail.com", medico: "favaloro@acclinica.com",especialidad:"Nutricion", fecha: new Date(), estado:"solicitado", resenia: ""}]

  constructor() { }

  ngOnInit(): void {
  }

  DescargarXLSX(){

    var data = [
      { name: "Barack Obama", pres: 44 },
    { name: "Donald Trump", pres: 45 }
  ];
  
  /* generate a worksheet */
  var ws = XLSX.utils.json_to_sheet(data);
  
  /* add to workbook */
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Presidents");
  
  /* write workbook and force a download */
  XLSX.writeFile(wb, "sheetjs.xlsx");
}


}
