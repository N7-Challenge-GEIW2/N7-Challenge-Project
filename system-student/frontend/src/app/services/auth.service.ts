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
    try{
      let user:any= await firstValueFrom( this.http.post('http://localhost:3000/login',{cni,password} , {
        withCredentials: true
      }));
      console.log("this is user",user)
      this.appState.setAuthState({
        isAuthenticated : true,
        cni : user.cni,
        roles : user.role,
        token : user.token
      });
      return Promise.resolve(user);
    }catch (e) {
      return Promise.reject("Bad credentials");
    }
  }

  async autologin(){
    try{
      let user:any= await firstValueFrom( this.http.get('http://localhost:3000/user' , {
        withCredentials: true
      }));
      console.log("this is user",user)
      this.appState.setAuthState({
        isAuthenticated : true,
        cni : user.cni,
        roles : user.role,
        token : user.token
      });
      return Promise.resolve(user);
    }catch (e) {
      return Promise.reject("Bad credentials");
    }
  }
}
