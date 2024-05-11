import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  formLogin! : FormGroup;
  errorMessage =undefined;

  constructor(private fb : FormBuilder,
              private router : Router,
              private authService : AuthService) { }

  ngOnInit() {
    this.formLogin=this.fb.group({
      cni : this.fb.control(""),
      password : this.fb.control("")
    })
  }

  handleLogin() {
    let cni=this.formLogin.value.cni;
    let password=this.formLogin.value.password;
    this.authService.login(cni, password)
      .then(resp=>{
        this.router.navigateByUrl("/teacher");
      })
      .catch(error=>{
        this.errorMessage=error;
      })
  }
}
