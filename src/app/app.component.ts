import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormService } from './form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isSubmitted: boolean;
  form: FormGroup;
  expectedValue: number = 0;
  isLoading = false;

  constructor(private formService: FormService) {}

  ngOnInit() {
    this.form = new FormGroup({
      startingBalance: new FormControl(5000000),
      monthlyInvestment: new FormControl(1000000),
      period: new FormControl(2),
    });

    this.formService.handleCalculate.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  onSubmit() {
    this.expectedValue =
      parseInt(this.form.get('startingBalance').value) +
      this.form.get('monthlyInvestment').value * this.form.get('period').value;
    this.isSubmitted = true;
  }

  onAsyncSubmit() {
    this.formService.observable().subscribe((success) => {
      if (success) {
        this.onSubmit();
      }
    });
  }
}
