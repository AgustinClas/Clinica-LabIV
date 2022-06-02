import { Injectable } from '@angular/core';
import { AngularFirestore, SnapshotOptions} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage'



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

  GetEspecialidades(){
    return this.db.collection('especialidades').valueChanges();
  }

  GuardarEspecialidad(especialidad:string){
    let esp = {"especialidad": especialidad}

    this.db.collection('especialidades').add(esp).catch(e => console.log("error al cargar en la base"));

  }

  async GetUsuario(mail:string){
    
    return await this.db.collection('usuarios').doc(mail);
  }

  GetUsuarios(){
    return this.db.collection('usuarios').valueChanges();
  }

  CambiarHabilitacion(mail:string, opcion:boolean){
    this.db.collection('usuarios').doc(mail).update({"activado": opcion});
  }
}
