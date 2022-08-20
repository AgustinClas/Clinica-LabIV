import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estado'
})
export class EstadoPipe implements PipeTransform {

  transform(value: string): string {
    
    if(value == "canceladoPac") return "cancelado por paciente"
    if(value == "canceladoAdm") return "cancelado por administrador"
    if(value == "canceladoEsp") return "cancelado por especialista"
    if(value == "pendienteAceptacion") return "Esperando aceptación"

    return value

  }

}
