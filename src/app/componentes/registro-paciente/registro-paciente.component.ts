import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFirebaseService } from 'src/app/servicios/auth-firebase.service';
import { DataStorageServiceService } from 'src/app/servicios/data-storage-service.service';

@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registro-paciente.component.html',
  styleUrls: ['./registro-paciente.component.css']
})
export class RegistroPacienteComponent implements OnInit {

  @Input() botonCambiar:boolean = true;
  @Output() CambiarRegistroEvento: EventEmitter<any> = new EventEmitter<any>();
  @Output() FormularioCargado: EventEmitter<any> = new EventEmitter<any>();


  paciente:any = {
    "nombre": "",
    "apellido": "",
    "edad": "",
    "dni": "",
    "obraSocial": "",
    "mail": "",
    "contrasenia": "",
    "tipo": "paciente",
    "img1": '',
    "img2": '',
  }

  contrasenia?:string;
  confContrasenia?:string;

  opcion:boolean = false;

  formValidaciones:any;
  
  constructor( private authService:AuthFirebaseService, private dataStorage:DataStorageServiceService, public ruteo:Router ) { 
    let fb = new FormBuilder();

    this.formValidaciones = fb.group(
      {
        'firstName': ['', [Validators.required,  Validators.pattern('[a-zA-Z ]*')]],
        'lastName': ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        'edad': ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.min(18), Validators.max(99)]],
        'dni': ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(10)]],
        'contrasenia': ['', [Validators.required]],
        'img1': ['', [Validators.required]],
        'img2': ['', [Validators.required]],
        //'confContrasenia': ['', [Validators.required /*, this.ValidarContrasenia*/]],
        'obraSocial':  ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        'mail': ['', [Validators.required, Validators.email]],
      }
    );
  }
  
  ngOnInit(): void {
  }



  CargarPaciente(){

    this.paciente.nombre = this.formValidaciones.controls['firstName'].value;
    this.paciente.apellido = this.formValidaciones.controls['lastName'].value;
    this.paciente.edad = this.formValidaciones.controls['edad'].value;
    this.paciente.dni = this.formValidaciones.controls['dni'].value;
    this.paciente.mail = this.formValidaciones.controls['mail'].value;
    this.paciente.contrasenia = this.formValidaciones.controls['contrasenia'].value;
    this.paciente.obraSocial = this.formValidaciones.controls['obraSocial'].value;

    this.registrar();
  }


  CambiarRegistro(){
    this.CambiarRegistroEvento.emit();
  }

  CargarImagen1(event:any){
    let archivos = event.target.files
    let reader = new FileReader();

    reader.readAsDataURL(archivos[0]);
    reader.onloadend = () => {
      this.dataStorage.img1 = reader.result;

    }
  }

  CargarImagen2(event:any){
    let archivos = event.target.files
    let reader = new FileReader();

    reader.readAsDataURL(archivos[0]);
    reader.onloadend = () => {
      this.dataStorage.img2 = reader.result;
    }
  }
  
  async registrar(){
    
    this.FormularioCargado.emit(this.paciente);

    /* this.authService.registrar(this.paciente.mail, this.paciente.contrasenia).then(() => {
      this.dataStorage.GuardarPaciente(this.paciente)
      this.authService.email = this.paciente.mail;
    }).catch(e => {
      console.log("Error al iniciar usuario" + e);
      //this.errorRegistro = true;
    }) */

  }
}
