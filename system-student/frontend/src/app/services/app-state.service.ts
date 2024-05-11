import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  public studentsState :any ={
    students:[],
    status : "",
    errorMessage :""
  }

  public authState :any ={
    isAuthenticated : false,
    cni : "",
    roles : "",
    token : ""
  }

  constructor() { }

  public  setStudentState(state :any):void {
    this.studentsState={...this.studentsState, ...state}
  }

  public setAuthState(state : any) :void{
    this.authState={...this.authState, ...state};
  }
}
