import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppStateService } from "../services/app-state.service";
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationGuard {

  constructor(private appState : AppStateService, private router : Router,private authService:AuthService) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree> {
    if (this.appState.authState.isAuthenticated){
      return true;
    }else{
      try{
        await this.authService.autologin()
        return true;
      }catch(e){
        console.log("this is error",e)
        this.router.navigate(['/login']);
        return false;
      }
    }
  }
}
