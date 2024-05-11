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
  public showAllSemesterFields: boolean = false;
  imageUrl: string | null = null;
  extractedText: string = '';

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
      semester6: this.formBuilder.control(0, [Validators.required]),
      extractedText: this.formBuilder.control('')  // Ajoutez le contrôle extractedText

    });
  }

  saveStudent() {
    let student: Student = this.studentForm.value;
    this.studentService.saveStudent(student).subscribe({
      next: data => {
        alert(JSON.stringify(data));
      },
      error: error => {
        console.log(error);
      }
    });
  }

  onDegreeTypeChange(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    this.showAllSemesterFields = (value === 'LICENCE');
    if (!this.showAllSemesterFields) {
      this.studentForm.get('semester5')?.reset();
      this.studentForm.get('semester6')?.reset();
    }
  }

  showSemesterFields() {
    return this.showAllSemesterFields || false;
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

  uploadImage(formData: FormData): void {
    this.http.post<{ extracted_text: string; image_base64: string }>('http://localhost:5000/upload', formData).subscribe(
      (response) => {
        this.imageUrl = 'data:image/png;base64,' + response.image_base64;
        this.studentForm.get('extractedText')?.setValue(response.extracted_text);  // Mettre à jour le texte extrait dans le formulaire
      },
      (error) => {
        console.error('Échec du téléchargement:', error);
      }
    );
}
}