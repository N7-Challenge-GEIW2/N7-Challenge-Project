import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  private host : string ="http://localhost:3000";
  errormsg: any;
  successmsg: any;

  constructor(private http: HttpClient) { }
  sendForm(): void {
    const formData = {
      fullname: (document.getElementById('_candidate_fullname') as HTMLInputElement).value,
      email: (document.getElementById('candidate_email') as HTMLInputElement).value,
      cne: (document.getElementById('candidate_cne') as HTMLInputElement).value,
      major: (document.querySelector('input[name="major"]:checked') as HTMLInputElement)?.id || '',
    };
    this.http.post<any>(`${this.host}/verify-student`, {cni: formData.cne,major:formData.major}).subscribe( (response) => {
        Swal.fire('Success', 'Candidature sent successfully!', 'success');
        // console.log(this.extractedText);
        this.successmsg = 'Candidature sent successfully!';
      },
      (error) => {
        Swal.fire('Error', error.error.message||"Something wrong happend", 'error');
        this.errormsg = error.error.message;
      })
    
    try {
      // Log the form data to the console
      console.log(formData);
      Swal.fire('Success', 'Candidature sent successfully!', 'success');
      this.resetForm();
    } catch (error) {
      console.error('Failed to send email', error);
      Swal.fire('Error', 'Failed to send candidature.', 'error');
    }
  }

  resetForm(): void {
    (document.getElementById('_candidate_fullname') as HTMLInputElement).value = '';
    (document.getElementById('candidate_email') as HTMLInputElement).value = '';
    (document.getElementById('candidate_cne') as HTMLInputElement).value = '';
    // Uncheck any checked radio buttons in the 'major' group
    const checkedRadioButton = document.querySelector('input[name="major"]:checked') as HTMLInputElement;
    if (checkedRadioButton) {
      checkedRadioButton.checked = false;
    }
  }


    endDate: Date = new Date('2024-05-12T17:29:29');
    DateInscription: string = '6 au 14 Mai 2024';
    

  
  isApplicationOver(): boolean {
    const currentDate = new Date();
    if(currentDate.getTime() > this.endDate.getTime()) {
      this.DateInscription = 'Inscription terminée';
      return true;
    }
    else{
      this.DateInscription = '6 au 14 Mai 2024';
    return false;
    }
  }
  
}
