import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appEstado]'
})
export class EstadoDirective {

  @Input() estado = '';

  constructor(private el: ElementRef) {
    if(this.estado == "finalizado")this.el.nativeElement.style.backgroundColor = 'green';
    else if(this.estado == "pendienteAceptacion" || this.estado == "aceptado")this.el.nativeElement.style.backgroundColor = 'yellow';
    else this.el.nativeElement.style.backgroundColor = 'red';
 }

}
