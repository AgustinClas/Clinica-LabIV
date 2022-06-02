import { Component, OnInit, Output, Input, EventEmitter  } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFirebaseService } from 'src/app/servicios/auth-firebase.service';
import { DataStorageServiceService } from 'src/app/servicios/data-storage-service.service';

@Component({
  selector: 'app-registro-especialista',
  templateUrl: './registro-especialista.component.html',
  styleUrls: ['./registro-especialista.component.css']
})
export class RegistroEspecialistaComponent implements OnInit {

  @Input() botonCambiar:boolean = true;
  @Output() CambiarRegistroEvento: EventEmitter<any> = new EventEmitter<any>();
  @Output() FormularioCargado: EventEmitter<any> = new EventEmitter<any>();
  especialista:any = {
    "nombre": "",
    "apellido": "",
    "edad": "",
    "dni": "",
    "especialidad": "",
    "mail": "",
    "contrasenia": "",
    "img1":"",
    "tipo": "especialista",
    "activado": false,
  }
  contrasenia?:string;
  //confContrasenia?:string;

  especialidades:any = [];

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
        //'confContrasenia': ['', [Validators.required /*, this.ValidarContrasenia*/]],
        'especialidad':  ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        'mail': ['', [Validators.required, Validators.email]],
        'img1': ['', [Validators.required]],
      }
    );
  }
  
  ngOnInit(): void {
    this.dataStorage.GetEspecialidades().subscribe(
      prod => {this.especialidades = prod;
      }
    )     
  }
    


  CargarEspecialista(){

    this.especialista.nombre = this.formValidaciones.controls['firstName'].value;
    this.especialista.apellido = this.formValidaciones.controls['lastName'].value;
    this.especialista.edad = this.formValidaciones.controls['edad'].value;
    this.especialista.dni = this.formValidaciones.controls['dni'].value;
    this.especialista.mail = this.formValidaciones.controls['mail'].value;
    this.especialista.contrasenia = this.formValidaciones.controls['contrasenia'].value;
    this.especialista.especialidad = this.formValidaciones.controls['especialidad'].value;

    this.registrar();
    //this.dataStorage.GuardarEspecialista(this.especialista);
    //this.ruteo.navigateByUrl("Home");
    //this.FormularioCargado.emit();
  }

  /* ValidarContrasenia ():{[key: string]: boolean} | null {
    if(this.confContrasenia == this.contrasenia){
      return {'ValidarContrasenia': true}
    }
    return null;
  }; */

  CambiarRegistro(){
    this.CambiarRegistroEvento.emit(1);
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

    this.authService.registrar(this.especialista.mail, this.especialista.contrasenia).then(() => {

      this.dataStorage.GuardarEspecialista(this.especialista);

      let flag = true;

      //Verifico si la especialidad se encuentra cargada en la base de datos
      this.especialidades.forEach((esp:any) => {
        if(esp.especialidad == this.especialista.especialidad ) {flag = false; stop;}
      });
      //Si no se encuentra cargada, la cargo en la base de datos
      if(flag) this.dataStorage.GuardarEspecialidad(this.especialista.especialidad)

      this.FormularioCargado.emit();
      //this.authService.EnviarEmail();
    }).catch(e => {
      console.log("Error al iniciar usuario" + e);
      //this.errorRegistro = true;
    })

  }
}
