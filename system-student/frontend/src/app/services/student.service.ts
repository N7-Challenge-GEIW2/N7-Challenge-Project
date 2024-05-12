import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student} from "../model/student.model";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private host : string ="http://localhost:3000";
  constructor(private http: HttpClient) { }

  public getStudents(){
    return this.http.get<Student[]>(`${this.host}/students`,{withCredentials: true});
  }

  saveStudent(student: Student):Observable<Student> {
    return this.http.post<Student>(`${this.host}/students`, student);
  }
}
