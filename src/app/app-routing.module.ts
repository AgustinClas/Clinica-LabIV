import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { VerificacionMailComponent } from './componentes/verificacion-mail/verificacion-mail.component';
import { AdminGuard } from './guards/admin.guard';
import { UsuarioDeslogueadoGuard } from './guards/usuario-deslogueado.guard';
import { UsuarioGuard } from './guards/usuario.guard';
import { BienvenidaComponent } from './paginas/bienvenida/bienvenida.component';
import { HomeComponent } from './paginas/home/home.component';
import { RegistroComponent } from './paginas/registro/registro.component';
import { UsuariosComponent } from './paginas/usuarios/usuarios.component';

const routes: Routes = [
  {path: '',  component:BienvenidaComponent, canActivate:[UsuarioDeslogueadoGuard]},
  {path: 'login', component:LoginComponent, canActivate:[UsuarioDeslogueadoGuard]},
  {path: 'registro', component:RegistroComponent, canActivate:[UsuarioDeslogueadoGuard]},
  {path: 'verificarMail', component:VerificacionMailComponent},
  {path: 'usuarios', component:UsuariosComponent, canActivate:[AdminGuard]},
  {path: 'Home', component:HomeComponent, canActivate:[UsuarioGuard]},
  {path: '*', component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//#FF1616 Rojo principal
//#FF5757 Rojo secundario
//#737373 Gris