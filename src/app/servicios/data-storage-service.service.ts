import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Injectable } from '@angular/core';
import { AngularFirestore, SnapshotOptions} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { timeStamp } from 'console';
import { map, timestamp } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class DataStorageServiceService {

  img1:any;
  img2:any;
  
  constructor(private db : AngularFirestore, private storage : AngularFireStorage) { 
  }

  GuardarLog( usuario : string ) {

    const fecha = new Date();

    const log = {"hora":fecha,"usuario":usuario}
    
    this.db.collection('logs').add(log).catch( e => console.log("error al cargar en la base"));
  }

  async GuardarPaciente(paciente:any){

    await this.GuardarImagen(paciente.mail + "img1", this.img1 ).then((img) => paciente.img1 = img)
    await this.GuardarImagen(paciente.mail + "img2", this.img2 ).then((img) => paciente.img2 = img)

    console.log(paciente);

    if(paciente.img1 != null && paciente.img2 != null)
    this.db.collection('usuarios').doc(paciente.mail).set(paciente)
    .catch(e => console.log("error al cargar en la base"));
    else console.log("No se puedo guardar en la base de datos")

  }

  async GuardarEspecialista(especialista:any){

    await this.GuardarImagen(especialista.mail + "img1", this.img1 ).then((img) => especialista.img1 = img)

    console.log(especialista);

    if(especialista.img1 != null)
    await this.db.collection('usuarios').doc(especialista.mail).set(especialista)
    .catch(e => console.log("error al cargar en la base"));
    else console.log("No se puedo guardar en la base de datos")

  }

  async GuardarImagen(nombre:string, imgBase64: any){
    
    let url;

      try{
        let respuesta = await this.storage.ref("usuarios").child(nombre).putString(imgBase64, 'data_url');
        await respuesta.ref.getDownloadURL().then(res => url = res).catch(() => url = null)
        console.log(url)
        return url;

      }catch(e){
        console.log(e)
        return null;
      }
  }

  GetEspecialistas(){
    return this.db.collection('usuarios', ref => ref.where('tipo','==', 'especialista')).valueChanges();
    //, ref => ref.where('tipo','==', 'especialista')
  }

  GetEspecialidades(){
    return this.db.collection('especialidades').valueChanges();
  }

  GuardarEspecialidad(especialidad:string){
    let esp = {"especialidad": especialidad, imagen: "https://firebasestorage.googleapis.com/v0/b/clinica-labiv.appspot.com/o/especialidades%2Fdoctor.png?alt=media&token=bb5bf655-360d-471f-ab8a-3401dc966165"}

    this.db.collection('especialidades').add(esp).catch(e => console.log("error al cargar en la base"));
  }

  async GetUsuario(mail:string){
    return await this.db.collection('usuarios').doc(mail);
  }

  GetUsuarios(){
    return this.db.collection('usuarios').valueChanges();
  }

  GetLogs(){
    return this.db.collection('logs').valueChanges();
  }

  CambiarHabilitacion(mail:string, opcion:boolean){
    this.db.collection('usuarios').doc(mail).update({"activado": opcion});
  }

  ActualizarDiasTrabajo(mail:string, dias:any){
    this.db.collection('usuarios').doc(mail).update({"diasAtencion": dias});
  }

  GuardarTurno( turno : any ) {
    this.db.collection('turnos').add(turno).catch( e => console.log("error al cargar en la base"));
  }

  GetTurnosAdmin(array:any){
    this.db.collection('turnos').get().subscribe
    (element => {

      if(element.docs){
        element.docs.forEach( (obj:any) => {

          let aux:any = { ...(obj.data() as Object),
          id: obj.id}
          aux.fecha = new Date(aux.fecha.seconds * 1000)

          this.db.collection('historias', ref => ref.where("fecha", '==' ,aux.fecha).where("especialista", '==' ,aux.especialista)).get().subscribe(
            element => {
              if(element.docs && element.docs.length > 0 && element.docs[0].data() != undefined){
                aux.historia = element.docs[0].data()
              }
              array.push(aux)
            }
          )
        })
      }      
    });
  }

  GetCantidadTurnos(){
    return this.db.collection('turnos', ref => ref.orderBy("fecha", "asc")).get()
  }

  GetCantidadTurnosFinalizados(){
    return this.db.collection('turnos', ref => ref.where("estado", "==", "finalizado").orderBy("fecha", "asc")).get()
  }

  GetTurnos(usuario:string, array:any){

    this.db.collection('turnos', ref => ref.where('paciente', '==', usuario)).get().subscribe
    (element => {

      if(element.docs){
        element.docs.forEach( (obj:any) => {

          let aux:any = { ...(obj.data() as Object),
          id: obj.id}
          aux.fecha = new Date(aux.fecha.seconds * 1000)

          this.db.collection('historias', ref => ref.where("fecha", '==' ,aux.fecha).where("paciente", '==' ,aux.paciente)).get().subscribe(
            element => {
              if(element.docs && element.docs.length > 0 && element.docs[0].data() != undefined){
                aux.historia = element.docs[0].data()
              }
              array.push(aux)
            }
          )
        })

      }      
    });
    
  }

  GetTurnosPorEspecialista(usuario:string, array:any){

    this.db.collection('turnos', ref => ref.where('especialista', '==', usuario)).get().subscribe
    (element => {

      if(element.docs){
        element.docs.forEach( (obj:any) => {

          let aux:any = { ...(obj.data() as Object),
          id: obj.id}
          aux.fecha = new Date(aux.fecha.seconds * 1000)

          this.db.collection('historias', ref => ref.where("fecha", '==' ,aux.fecha).where("especialista", '==' ,aux.especialista)).get().subscribe(
            element => {
              if(element.docs && element.docs.length > 0 && element.docs[0].data() != undefined){
                aux.historia = element.docs[0].data()
              }
              array.push(aux)
            }
          )
        })
      }      
    });
  }


  ActualizarTurno(doc:string, comentario:string, estado:string){
    this.db.collection('turnos').doc(doc).update({"comentario": comentario, "estado": estado});
  }

  ActualizarTurnoResenia(doc:string, comentario:string, estado:string){
    this.db.collection('turnos').doc(doc).update({"resenia": comentario, "estado": estado});
  }

  GuardarHistoria(historia:{}){
    this.db.collection('historias').add(historia).catch( e => console.log("error al cargar en la base"));
  }

  async GetHistoriasPorEspecialista(usuario:string, arrayHistorias:any, arrayUsuarios:any, historiasTop3:any){

    await this.db.collection('historias', ref => ref.where('especialista', '==', usuario).orderBy("fecha", "desc")).get().subscribe
    (element => {

      if(element.docs){
        element.docs.forEach( (obj:any) => {

          let aux:any = { ...(obj.data() as Object),
          id: obj.id}
          aux.fecha = new Date(aux.fecha.seconds * 1000)
          arrayHistorias.push(aux)

          if(!arrayUsuarios.includes(aux.paciente)) arrayUsuarios.push(aux.paciente);
          
        })
      }     
      
      for(let i = 0; i < 3; i++){
        historiasTop3[i] = arrayHistorias.filter((obj:any) => {
          return obj.paciente == arrayUsuarios[i]
        })
      }

      arrayUsuarios.splice(0, 3);
    });
  }

  GetHistoriasPorPaciente(usuario:string, array:any){

    this.db.collection('historias', ref => ref.where('paciente', '==', usuario).orderBy("fecha", "desc")).get().subscribe
    (element => {

      if(element.docs){
        element.docs.forEach( (obj:any) => {

          let aux:any = { ...(obj.data() as Object),
          id: obj.id}
          aux.fecha = new Date(aux.fecha.seconds * 1000)
          array.push(aux)
        })
      }      
    });
  }
  
}
