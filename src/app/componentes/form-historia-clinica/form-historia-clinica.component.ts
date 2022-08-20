import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFirebaseService } from 'src/app/servicios/auth-firebase.service';
import { DataStorageServiceService } from 'src/app/servicios/data-storage-service.service';

@Component({
  selector: 'app-form-historia-clinica',
  templateUrl: './form-historia-clinica.component.html',
  styleUrls: ['./form-historia-clinica.component.css']
})
export class FormHistoriaClinicaComponent implements OnInit {

  @Input() turno:any;
  @Output() FormularioCargado: EventEmitter<any> = new EventEmitter<any>();

  encuesta:any = {
    "altura":"",
    "peso": "",
    "temperatura": "",
    "presion": "",
    "clave1": "",
    "clave2": "",
    "clave3": "",
    "clave4": "",
    "valor1": "",
    "valor2": "",
    "valor3": "",
    "valor4": "",
  }

  formValidaciones;
  camposAgregados:any = [];
  contador = 1;
  
  constructor( private authService:AuthFirebaseService, private dataStorage:DataStorageServiceService, public ruteo:Router ) { 
    let fb = new FormBuilder();

    this.formValidaciones = fb.group(
      {
        'altura': ['', [Validators.required, Validators.pattern('[0-9]*')]],
        'peso': ['', [Validators.required, Validators.pattern('[0-9,]*')]],
        'temperatura': ['', [Validators.required, Validators.pattern('[0-9,]*')]],
        'presion': ['', [Validators.required, Validators.pattern('[0-9,]*')]],
      }
    );
  }
  
  ngOnInit(): void {

  }

  AgregarCampo(){

    this.contador++;
    
    this.formValidaciones.addControl("campo" + this.contador.toString(), new FormControl('', Validators.required))
    this.formValidaciones.addControl("valor" + this.contador.toString(), new FormControl('', Validators.required))

    this.camposAgregados.push({"campo": "campo" + this.contador.toString(), "valor": "valor" + this.contador.toString()})
  }


  EnviarHistoria(){

    let camposDinamicos:any = [];

    this.camposAgregados.forEach((element:any) => {
      camposDinamicos.push({
        campo: this.formValidaciones.controls[element.campo].value,
        valor: this.formValidaciones.controls[element.valor].value,
      })
    });

    let historia = {
      fecha : this.turno.fecha,
      paciente : this.turno.paciente,
      especialista : this.turno.especialista,
      especialidad : this.turno.especialidad,
      altura: this.formValidaciones.controls['altura'].value,
      peso: this.formValidaciones.controls['peso'].value,
      temperatura: this.formValidaciones.controls['temperatura'].value,
      presion: this.formValidaciones.controls['presion'].value,
      camposDinamicos
    }

    console.log(historia);
    
    this.dataStorage.GuardarHistoria(historia);

    this.FormularioCargado.emit();
  }
}
