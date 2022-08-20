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
import { NuevoTurnoComponent } from './paginas/nuevo-turno/nuevo-turno.component';
import { MisTurnosPacienteComponent } from './paginas/mis-turnos-paciente/mis-turnos-paciente.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MisTurnosEspecialistaComponent } from './paginas/mis-turnos-especialista/mis-turnos-especialista.component';
import { TurnosAdminComponent } from './paginas/turnos-admin/turnos-admin.component';
import { FormHistoriaClinicaComponent } from './componentes/form-historia-clinica/form-historia-clinica.component';
import { HistoriaClinicaComponent } from './componentes/historia-clinica/historia-clinica.component';
import { PacientesComponent } from './paginas/pacientes/pacientes.component';
import { EstadisticasComponent } from './paginas/estadisticas/estadisticas.component';
import { NgChartsModule } from 'ng2-charts';
import { GraficoLogsComponent } from './componentes/grafico-logs/grafico-logs.component';
import { GraficoTurnosEspecialidadComponent } from './componentes/grafico-turnos-especialidad/grafico-turnos-especialidad.component';
import { GraficoTurnosDiaComponent } from './componentes/grafico-turnos-dia/grafico-turnos-dia.component';
import { GraficoTurnosPorMedicoComponent } from './componentes/grafico-turnos-por-medico/grafico-turnos-por-medico.component';
import { GraficoTurnosFinalizadosComponent } from './componentes/grafico-turnos-finalizados/grafico-turnos-finalizados.component';
import { AlturaPipe } from './pipes/altura.pipe';
import { EstadoPipe } from './pipes/estado.pipe';
import { EstadoDirective } from './directivas/estado.directive';

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
    NuevoTurnoComponent,
    MisTurnosPacienteComponent,
    MisTurnosEspecialistaComponent,
    TurnosAdminComponent,
    FormHistoriaClinicaComponent,
    HistoriaClinicaComponent,
    PacientesComponent,
    EstadisticasComponent,
    GraficoLogsComponent,
    GraficoTurnosEspecialidadComponent,
    GraficoTurnosDiaComponent,
    GraficoTurnosPorMedicoComponent,
    GraficoTurnosFinalizadosComponent,
    AlturaPipe,
    EstadoPipe,
    EstadoDirective,
  ],
  imports: [
    BrowserModule,
    NgChartsModule,
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
    }),
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
