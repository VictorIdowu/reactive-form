import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError } from 'rxjs/operators';
import { NgxSemanticModule } from 'ngx-semantic';
import { CommonModule } from '@angular/common';
import { SuccessService } from '../success.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [NgxSemanticModule, ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  countries = [{ text: 'Nigeria', value: 'Nigeria' }];
  occupations = [
    { text: 'Frontend Developer', value: 'Frontend Developer' },
    { text: 'Backend Developer', value: 'Backend Developer' },
    { text: 'Designer', value: 'Designer' },
    { text: 'Devops Engineer', value: 'Devops Engineer' },
  ];
  seePassword = false;
  toggleSeePass() {
    this.seePassword = !this.seePassword;
  }

  constructor(
    private fb: FormBuilder,

    private success: SuccessService
  ) {}

  fieldIsInvalid(field: string) {
    return this.form.get(field)?.invalid && this.form.get(field)?.touched;
  }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\W).*$/),
        ],
      ],
      phone: ['', Validators.required],
      country: ['Nigeria', Validators.required],
      occupation: ['Frontend Developer', Validators.required],
      successful: ['true', Validators.required],
    });

    this.success.getCountries().subscribe({
      next: (data) => {
        const sortedData = data.sort((a: any, b: any) =>
          a.name.common.localeCompare(b.name.common)
        );

        this.countries = sortedData.map((country) => {
          return { text: country.name.common, value: country.name.common };
        });
      },
      error: (err) => console.error('Subscription error:', err),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const successful = this.form.get('successful')?.value === 'true';
      if (successful) {
        this.success.details = this.form.value;
        this.success.toastNdRout('success');
      } else {
        this.success.toastNdRout('error');
      }
    }
  }
}
