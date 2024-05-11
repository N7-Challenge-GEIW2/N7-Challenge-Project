import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {AppStateService} from "./app-state.service";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http : HttpClient,
              private appState : AppStateService) { }

  async login(cni : string, password : string){
    let user:any= await firstValueFrom(this.http.post("http://localhost:port/users", {cni}));
    if(password==atob(user.password)){
      let decodedJwt:any = jwtDecode(user.token);
      this.appState.setAuthState({
        isAuthenticated : true,
        cni : decodedJwt.sub,
        roles : decodedJwt.roles,
        token : user.token
      });
      return Promise.resolve(true);
    } else {
      return Promise.reject("Bad credentials");
    }
  }
}
