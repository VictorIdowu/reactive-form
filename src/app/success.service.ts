import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class SuccessService {
  constructor(private toastr: ToastrService, private router: Router) {}

  details = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    country: '',
    occupation: '',
    successful: '',
  };

  toastNdRout(user: string) {
    if (user === 'success') {
      this.toastr.success('Form submitted successfully!');
      this.router.navigate(['/success']);
    } else {
      this.toastr.error('Form submission failed!', 'Error', {
        timeOut: 5000,
      });
      setTimeout(() => {
        this.router.navigate(['/form']);
      }, 5000);
    }
  }
}
