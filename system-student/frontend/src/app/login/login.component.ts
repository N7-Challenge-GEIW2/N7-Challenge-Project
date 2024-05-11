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
              private http : HttpClient) { }

  ngOnInit() {
    this.formLogin=this.fb.group({
      cni : this.fb.control(""),
      password : this.fb.control("")
    })
  }

  handleLogin() {
    this.http.post('http://localhost:port/login', this.formLogin.getRawValue(), {
      withCredentials: true
    }).subscribe((response: any) => {
      if (response.role === 'TEACHER') {
        this.router.navigate(['/teacher']);
      } else if (response.role === 'STUDENT') {
        this.router.navigate(['/student']);
      }
    });
  }

}
