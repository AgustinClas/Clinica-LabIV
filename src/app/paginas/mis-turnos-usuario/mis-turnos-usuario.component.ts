import { Component, OnInit } from '@angular/core';

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



}
