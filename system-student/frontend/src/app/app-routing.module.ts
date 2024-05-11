import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthenticationGuard} from "./guards/authentication.guard";
import {LoginComponent} from "./login/login.component";
import {TeacherTemplateComponent} from "./teacher-template/teacher-template.component";

const routes: Routes = [
  {path : "login", component: LoginComponent},
  {path : "teacher", component : TeacherTemplateComponent,canActivate:[AuthenticationGuard]},
  {path : "", redirectTo : "login", pathMatch :'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
