import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  
  constructor( private authService:AuthFirebaseService, private dataStorage:DataStorageServiceService, public ruteo:Router ) { 
    let fb = new FormBuilder();

    this.formValidaciones = fb.group(
      {
        'altura': ['', [Validators.required, Validators.pattern('[0-9]*')]],
        'peso': ['', [Validators.required, Validators.pattern('[0-9,]*')]],
        'temperatura': ['', [Validators.required, Validators.pattern('[0-9,]*')]],
        'presion': ['', [Validators.required, Validators.pattern('[0-9,]*')]],
        'clave1': ['', [Validators.required]],
        'clave2': ['', [Validators.required]],
        'clave3': ['', [Validators.required]],
        'clave4': ['', [Validators.required]],
        'valor1': ['', [Validators.required]],
        'valor2': ['', [Validators.required]],
        'valor3': ['', [Validators.required]],
        'valor4': ['', [Validators.required]],
      }
    );
  }
  
  ngOnInit(): void {
  }

  EnviarH(){
  }

  EnviarHistoria(){

    let historia = {
      fecha : this.turno.fecha,
      paciente : this.turno.paciente,
      especialista : this.turno.especialista,
      especialidad : this.turno.especialidad,
      altura: this.formValidaciones.controls['altura'].value,
      peso: this.formValidaciones.controls['peso'].value,
      temperatura: this.formValidaciones.controls['temperatura'].value,
      presion: this.formValidaciones.controls['presion'].value,
      campo1:{clave: this.formValidaciones.controls['clave1'].value, valor: this.formValidaciones.controls['valor1'].value},
      campo2:{clave: this.formValidaciones.controls['clave2'].value, valor: this.formValidaciones.controls['valor2'].value},
      campo3:{clave: this.formValidaciones.controls['clave3'].value, valor: this.formValidaciones.controls['valor3'].value},
      campo4:{clave: this.formValidaciones.controls['clave4'].value, valor: this.formValidaciones.controls['valor4'].value}
    }

    console.log(historia);
    
    this.dataStorage.GuardarHistoria(historia);

    this.FormularioCargado.emit();
  }
}
