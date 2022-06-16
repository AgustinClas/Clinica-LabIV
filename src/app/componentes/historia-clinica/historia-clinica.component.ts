import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class HistoriaClinicaComponent implements OnInit {

  @Input() historias:any;

  constructor() { }

  ngOnInit(): void {
  }

}
