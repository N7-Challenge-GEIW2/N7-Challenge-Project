import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { Student } from '../model/student.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-teacher-template',
  templateUrl: './teacher-template.component.html',
  styleUrls: ['./teacher-template.component.css']
})
export class TeacherTemplateComponent implements OnInit {
  public studentForm!: FormGroup;
  public showFourSemesterFields: boolean = false;
  public showSixSemesterFields: boolean = false;
  errormsg: any;
  successmsg: any;

  public extractedText: string = ''; 
  public imageUrl?: string;

  constructor(private formBuilder: FormBuilder, private studentService: StudentService, private http: HttpClient) { }

  ngOnInit() {
    this.studentForm = this.formBuilder.group({
      cne: this.formBuilder.control('', [Validators.required]),
      major: this.formBuilder.control('', [Validators.required]),
      schoolName: this.formBuilder.control('', [Validators.required]),
      degreeType: this.formBuilder.control('', [Validators.required]),
      s1: this.formBuilder.control(0, [Validators.required]),
      s2: this.formBuilder.control(0, [Validators.required]),
      s3: this.formBuilder.control(0, [Validators.required]),
      s4: this.formBuilder.control(0, [Validators.required]),
      s5: this.formBuilder.control(0, [Validators.required]),
      s6: this.formBuilder.control(0, [Validators.required])
    });
  }

  saveStudent() {
    let student: Student = this.studentForm.value;
    this.studentService.saveStudent(student).subscribe({
      next: data => {
        alert(JSON.stringify(data));
        this.successmsg = 'Student saved successfully!';
        this.studentForm.reset();
      },
      error: error => {
        console.log(error);
        this.errormsg = error.message;
      }
    });
  }

  onDegreeTypeChange(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    this.showFourSemesterFields = (value == 'DEUG' || value == 'DEUST' || value == 'DUT');
    this.showSixSemesterFields = (value == 'LICENCE');
    if (this.showFourSemesterFields) {
      this.studentForm.get('s1')?.reset();
      this.studentForm.get('s2')?.reset();
      this.studentForm.get('s3')?.reset();
      this.studentForm.get('s4')?.reset();
    } else if(this.showSixSemesterFields) {
      this.studentForm.get('s1')?.reset();
      this.studentForm.get('s2')?.reset();
      this.studentForm.get('s3')?.reset();
      this.studentForm.get('s4')?.reset();
      this.studentForm.get('s5')?.reset();
      this.studentForm.get('s6')?.reset();
    }
  }

  showSemesterFields1() {
    return this.showFourSemesterFields || false;
  }

  showSemesterFields2() {
    return this.showSixSemesterFields || false;
  }

  onUploadClick() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.addEventListener('change', (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        this.uploadImage(formData);
      }
    });
    fileInput.click();
  }

  uploadImage(formData: FormData) {
    this.http.post<any>('http://localhost:5000/upload', formData).subscribe(
      (response) => {
        console.log('Texte extrait:', response.extracted_text);
        this.imageUrl = 'data:image/png;base64,' + response.image_base64;
        this.extractedText = response.extracted_text; 
        // console.log(this.extractedText);
      },
      (error) => {
        console.error('Échec du téléchargement:', error);
      }
    );
  }

  }

