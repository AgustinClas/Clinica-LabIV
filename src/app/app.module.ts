import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent} from './componentes/login/login.component';
import { NavBarComponent } from './componentes/nav-bar/nav-bar.component';
import { LoadingComponent } from './componentes/loading/loading.component';
import { BienvenidaComponent } from './paginas/bienvenida/bienvenida.component';
import { RegistroComponent } from './paginas/registro/registro.component';
import { RegistroPacienteComponent } from './componentes/registro-paciente/registro-paciente.component';
import { RegistroEspecialistaComponent } from './componentes/registro-especialista/registro-especialista.component';
import { VerificacionMailComponent } from './componentes/verificacion-mail/verificacion-mail.component';
import { UsuariosComponent } from './paginas/usuarios/usuarios.component';
import { RegistroAdminComponent } from './componentes/registro-admin/registro-admin.component';
import { HomeComponent } from './paginas/home/home.component';
import { PerfilComponent } from './paginas/perfil/perfil.component';
import { CaptchaComponent } from './componentes/captcha/captcha.component';
import { MisTurnosUsuarioComponent } from './paginas/mis-turnos-usuario/mis-turnos-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    LoadingComponent,
    BienvenidaComponent,
    RegistroComponent,
    RegistroPacienteComponent,
    RegistroEspecialistaComponent,
    VerificacionMailComponent,
    UsuariosComponent,
    RegistroAdminComponent,
    HomeComponent,
    PerfilComponent,
    CaptchaComponent,
    MisTurnosUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBsJC_WJ8VRbdelmHHH6OAI-l3HlxsobR4",
      authDomain: "clinica-labiv.firebaseapp.com",
      projectId: "clinica-labiv",
      storageBucket: "clinica-labiv.appspot.com",
      messagingSenderId: "194775249837",
      appId: "1:194775249837:web:eff89746ea2e0dfe876724"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
