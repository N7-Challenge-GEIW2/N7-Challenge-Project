import { Component } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  sendForm(): void {
    // Retrieve the form data
    const formData = {
      fullname: (document.getElementById('_candidate_fullname') as HTMLInputElement).value,
      email: (document.getElementById('candidate_email') as HTMLInputElement).value,
      cne: (document.getElementById('candidate_cne') as HTMLInputElement).value,
      major: (document.querySelector('input[name="major"]:checked') as HTMLInputElement)?.id || '',
    };
  try {
    // Log the form data to the console
    console.log(formData);
    Swal.fire('Success', 'Candidature sent successfully!', 'success');
    this.resetForm();
  } catch (error) {
    console.error('Failed to send email', error);
    Swal.fire('Error', 'Failed to send candidature.', 'error');}
  }
  resetForm(): void {
    // Reset the values of the input fields to empty strings
    (document.getElementById('_candidate_fullname') as HTMLInputElement).value = '';
    (document.getElementById('candidate_email') as HTMLInputElement).value = '';
    (document.getElementById('candidate_cne') as HTMLInputElement).value = '';

    // Uncheck any checked radio buttons in the 'major' group
    const checkedRadioButton = document.querySelector('input[name="major"]:checked') as HTMLInputElement;
    if (checkedRadioButton) {
      checkedRadioButton.checked = false;
    }
  }
  
}
