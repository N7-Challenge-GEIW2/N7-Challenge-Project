import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthenticationGuard} from "./guards/authentication.guard";
import {LoginComponent} from "./login/login.component";
import {TeacherTemplateComponent} from "./teacher-template/teacher-template.component";
import { StudentTemplateComponent } from './student-template/student-template.component';
import { AuthorizationGuard } from './guards/authorization.guard';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';

const routes: Routes = [
  {path : "login", component: LoginComponent},
  {path : "teacher", component : TeacherTemplateComponent,canActivate:[AuthenticationGuard,AuthorizationGuard],data:{requiredRoles : "teacher"}},
  {path : "student", component : StudentTemplateComponent,canActivate:[AuthenticationGuard,AuthorizationGuard],data:{requiredRoles : "student"}},
  {path : "notAuthorized", component: NotAuthorizedComponent},
  {path : "", redirectTo : "login", pathMatch :'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
