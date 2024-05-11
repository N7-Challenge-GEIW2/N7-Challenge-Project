import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {HttpClient} from "@angular/common/http";

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
              private http : HttpClient,
            private authService:AuthService) { }

  ngOnInit() {
    this.formLogin=this.fb.group({
      cni : this.fb.control(""),
      password : this.fb.control("")
    })
  }

  handleLogin() {
    let cni = this.formLogin.get('cni')?.value;
    let password = this.formLogin.get('password')?.value;
    this.authService.login(cni,password).then((user: any) => {
      console.log(user.role)
      if (user.role === 'teacher') {
        this.router.navigate(['/teacher']);
      } else if (user.role === 'student') {
        this.router.navigate(['/student']);
      }
    });
  }

}
