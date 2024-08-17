import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';

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

  getCountries(): Observable<any[]> {
    return fromFetch('https://restcountries.com/v3.1/all').pipe(
      switchMap((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error(`Error ${response.status}`);
          return of([]);
        }
      }),
      catchError((err) => {
        console.error('Fetch error:', err);
        return of([]);
      })
    );
  }

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
