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

  constructor(private formBuilder: FormBuilder, private studentService: StudentService, private http: HttpClient) { }

  ngOnInit() {
    this.studentForm = this.formBuilder.group({
      cne: this.formBuilder.control('', [Validators.required]),
      major: this.formBuilder.control('', [Validators.required]),
      schoolName: this.formBuilder.control('', [Validators.required]),
      degreeType: this.formBuilder.control('', [Validators.required]),
      semester1: this.formBuilder.control(0, [Validators.required]),
      semester2: this.formBuilder.control(0, [Validators.required]),
      semester3: this.formBuilder.control(0, [Validators.required]),
      semester4: this.formBuilder.control(0, [Validators.required]),
      semester5: this.formBuilder.control(0, [Validators.required]),
      semester6: this.formBuilder.control(0, [Validators.required])
    });
  }

  saveStudent() {
    let student: Student = this.studentForm.value;
    this.studentService.saveStudent(student).subscribe({
      next: data => {
        alert(JSON.stringify(data));
      }, error: error => {
        console.log(error);
      }
    });
  }

  onDegreeTypeChange(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    this.showFourSemesterFields = (value == 'DEUG' || value == 'DEUST' || value == 'DUT');
    this.showSixSemesterFields = (value == 'LICENCE');
    if (this.showFourSemesterFields) {
      this.studentForm.get('semester1')?.reset();
      this.studentForm.get('semester2')?.reset();
      this.studentForm.get('semester3')?.reset();
      this.studentForm.get('semester4')?.reset();
    }
    else if(this.showSixSemesterFields) {
      this.studentForm.get('semester1')?.reset();
      this.studentForm.get('semester2')?.reset();
      this.studentForm.get('semester3')?.reset();
      this.studentForm.get('semester4')?.reset();
      this.studentForm.get('semester5')?.reset();
      this.studentForm.get('semester6')?.reset();
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
        // Afficher le texte extrait dans la console
        console.log('Texte extrait:', response.extracted_text);
      },
      (error) => {
        // Gérer l'erreur
        console.error('Échec du téléchargement:', error);
      }
    );
  }
  
}
