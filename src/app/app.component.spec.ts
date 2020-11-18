import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [AppComponent],
      providers: [{ provide: FormBuilder, useValue: formBuilder }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    component.form = formBuilder.group({
      startingBalance: 5000000,
      monthlyInvestment: 1000000,
      period: 2,
    });
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should make isSubmitted true', () => {
    const mockIsSubmitted = false;
    component.isSubmitted = mockIsSubmitted;

    component.onSubmit();

    expect(component.isSubmitted).toBe(true);
  });

  it('should make expected value 7 mil', () => {
    component.onSubmit();

    expect(component.expectedValue).toBe(7000000);
  });

  it('should make expected value 7 mil after 500ms', fakeAsync(() => {
    component.onAsyncSubmit();
    tick(500);
    expect(component.expectedValue).toBe(7000000);
  }));
});
