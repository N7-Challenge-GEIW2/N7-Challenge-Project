import {Component, OnInit} from '@angular/core';
import {Student} from "../model/student.model";
import {StudentService} from "../services/student.service";

@Component({
  selector: 'app-student-template',
  templateUrl: './student-template.component.html',
  styleUrls: ['./student-template.component.css']
})
export class StudentTemplateComponent implements OnInit{
  public students :Array<Student>=[];
  constructor(private studentService:StudentService) { }

  ngOnInit() {
    this.getStudents();
  }

  getStudents(){
    this.studentService.getStudents().subscribe({
      next : data => {
        this.students=data;
      },
      error : err => {
        console.log(err);
      }
    })
  }
}
