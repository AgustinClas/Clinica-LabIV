import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit {

  @Output() CaptchaAprobado: EventEmitter<any> = new EventEmitter<any>();
  @Output() CaptchaDenegado: EventEmitter<any> = new EventEmitter<any>();

  arrayNumeros = [{num:0, bloqueado: false},
    {num:0, bloqueado: false},
    {num:0, bloqueado: false},
    {num:0, bloqueado: false},
    {num:0, bloqueado: false},
    {num:0, bloqueado: false},
    {num:0, bloqueado: false},
    {num:0, bloqueado: false},
    {num:0, bloqueado: false},
    {num:0, bloqueado: false}]

  contadorPares = 0;
  contadorAciertos = 0;
  error = false;

  constructor() { }

  ngOnInit(): void {
    for(let i=0;i<9;i++){
      this.arrayNumeros[i].num = Math.floor(Math.random() * (15 - 0 + 1)) + 0;
      if(this.arrayNumeros[i].num % 2 == 0) this.contadorPares++;
    }
  }

  ElegirOpcion(opcion:number){
    
    this.arrayNumeros[opcion].bloqueado = true;

    if(!this.error && this.arrayNumeros[opcion].num % 2 == 0) this.contadorAciertos++;
    else this.error = true

  }

  EnviarCaptcha(){
    if(!this.error && this.contadorPares == this.contadorAciertos) this.CaptchaAprobado.emit();
    else this.CaptchaDenegado.emit();
  }

}
