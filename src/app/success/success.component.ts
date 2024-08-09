import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SuccessService } from '../success.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css',
})
export class SuccessComponent implements OnInit {
  constructor(private router: Router, private success: SuccessService) {}
  details: any;

  ngOnInit() {
    const deets: any = this.success.details;
    this.details = Object.keys(deets)
      .filter((key) => key !== 'password' && key !== 'successful')
      .map((key) => deets[key]);
  }

  goBack() {
    console.log();
    this.router.navigate(['/form']);
  }
}
