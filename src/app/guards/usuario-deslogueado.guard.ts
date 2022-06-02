import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthFirebaseService } from '../servicios/auth-firebase.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioDeslogueadoGuard implements CanActivate {

  constructor(private authService:AuthFirebaseService, private ruteo:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.authService.usuario) return true
      
      return false;
  }
  
}
