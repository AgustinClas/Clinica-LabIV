import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit  {

  opcion:boolean = false;
  formCargado = false;
  
  constructor( public ruteo:Router ){
  }

  ngOnInit(): void {
  }

  CambiarRegistro(opcion:number){
    if(opcion===1) this.opcion = true;
    else this.opcion = false;
  }

  CambiarPantalla(){
    this.ruteo.navigateByUrl("verificarMail")
  }

}
