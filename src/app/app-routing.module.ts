import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { VerificacionMailComponent } from './componentes/verificacion-mail/verificacion-mail.component';
import { AdminGuard } from './guards/admin.guard';
import { EspecialistaGuard } from './guards/especialista.guard';
import { PacienteGuard } from './guards/paciente.guard';
import { UsuarioDeslogueadoGuard } from './guards/usuario-deslogueado.guard';
import { UsuarioGuard } from './guards/usuario.guard';
import { BienvenidaComponent } from './paginas/bienvenida/bienvenida.component';
import { HomeComponent } from './paginas/home/home.component';
import { MisTurnosEspecialistaComponent } from './paginas/mis-turnos-especialista/mis-turnos-especialista.component';
import { MisTurnosPacienteComponent } from './paginas/mis-turnos-paciente/mis-turnos-paciente.component';
import { MisTurnosUsuarioComponent } from './paginas/mis-turnos-usuario/mis-turnos-usuario.component';
import { NuevoTurnoComponent } from './paginas/nuevo-turno/nuevo-turno.component';
import { PerfilComponent } from './paginas/perfil/perfil.component';
import { RegistroComponent } from './paginas/registro/registro.component';
import { TurnosAdminComponent } from './paginas/turnos-admin/turnos-admin.component';
import { UsuariosComponent } from './paginas/usuarios/usuarios.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PacientesComponent } from './paginas/pacientes/pacientes.component';
import { EstadisticasComponent } from './paginas/estadisticas/estadisticas.component';

const routes: Routes = [
  {path: '',  component:BienvenidaComponent, canActivate:[UsuarioDeslogueadoGuard], },
  {path: 'login', component:LoginComponent, canActivate:[UsuarioDeslogueadoGuard]},
  {path: 'registro', component:RegistroComponent, canActivate:[UsuarioDeslogueadoGuard]},
  {path: 'verificarMail', component:VerificacionMailComponent},
  {path: 'usuarios', component:UsuariosComponent, canActivate:[AdminGuard]},
  {path: 'Home', component:HomeComponent, canActivate:[UsuarioGuard]},
  {path: 'Perfil', component: PerfilComponent, canActivate:[UsuarioGuard]},
  {path: 'MisTurnosPaciente', component:MisTurnosUsuarioComponent},
  {path: 'NuevoTurno', component: NuevoTurnoComponent},
  {path: 'MisTurnosPac', component: MisTurnosPacienteComponent, canActivate:[PacienteGuard]},
  {path: 'MisTurnosEsp', component: MisTurnosEspecialistaComponent, canActivate:[EspecialistaGuard]},
  {path: 'Pacientes', component: PacientesComponent, canActivate:[EspecialistaGuard]},
  {path: 'turnos', component: TurnosAdminComponent, canActivate:[AdminGuard]},
  {path: 'estadisticas', component: EstadisticasComponent, canActivate:[AdminGuard]},
  {path: '*', component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

