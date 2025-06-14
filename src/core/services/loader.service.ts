// src/app/core/services/loader.service.ts

import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private requestCount = 0;

  constructor(private spinner: NgxSpinnerService) {}

  show(): void {
    this.requestCount++;
    if (this.requestCount === 1) {
      this.spinner.show();
    }
  }

  hide(): void {
    if (this.requestCount === 0) return;

    this.requestCount--;
    if (this.requestCount === 0) {
      this.spinner.hide();
    }
  }

  reset(): void {
    this.requestCount = 0;
    this.spinner.hide();
  }
}
