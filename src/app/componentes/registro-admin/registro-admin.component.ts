import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFirebaseService } from 'src/app/servicios/auth-firebase.service';
import { DataStorageServiceService } from 'src/app/servicios/data-storage-service.service';

@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.css']
})
export class RegistroAdminComponent implements OnInit {

  @Input() botonCambiar:boolean = true;
  @Output() CambiarRegistroEvento: EventEmitter<any> = new EventEmitter<any>();
  @Output() FormularioCargado: EventEmitter<any> = new EventEmitter<any>();


  admin:any = {
    "nombre": "",
    "apellido": "",
    "edad": "",
    "dni": "",
    "mail": "",
    "contrasenia": "",
    "tipo": "admin",
    "img1": '',
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
        'mail': ['', [Validators.required, Validators.email]],
      }
    );
  }
  
  ngOnInit(): void {
  }



  CargarAdmin(){

    this.admin.nombre = this.formValidaciones.controls['firstName'].value;
    this.admin.apellido = this.formValidaciones.controls['lastName'].value;
    this.admin.edad = this.formValidaciones.controls['edad'].value;
    this.admin.dni = this.formValidaciones.controls['dni'].value;
    this.admin.mail = this.formValidaciones.controls['mail'].value;
    this.admin.contrasenia = this.formValidaciones.controls['contrasenia'].value;

    this.registrar();
    //this.FormularioCargado.emit(this.admin);
  }

  /* ValidarContrasenia ():{[key: string]: boolean} | null {
    if(this.confContrasenia == this.contrasenia){
      return {'ValidarContrasenia': true}
    }
    return null;
  }; */

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

  
  async registrar(){

    this.authService.registrar(this.admin.mail, this.admin.contrasenia).then(() => {
      this.dataStorage.GuardarEspecialista(this.admin)
      this.FormularioCargado.emit();
    }).catch(e => {
      console.log("Error al iniciar usuario" + e);
      //this.errorRegistro = true;
    })

  }
}
