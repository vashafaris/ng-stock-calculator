import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  handleCalculate = new Subject<boolean>();

  constructor() {}

  observable = () => {
    const customObservable = Observable.create((observer) => {
      this.handleCalculate.next(true);
      setTimeout(() => {
        this.handleCalculate.next(false);
        observer.next(true);
        observer.complete();
      }, 500);
    });
    return customObservable;
  };
}
