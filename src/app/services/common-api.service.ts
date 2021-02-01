import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwError } from 'rxjs';
import { timeout, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {
  private maxTimeout = 8000; // to through timeout error if api takes more than this time
  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {
  }

  getAction(path: string) {
    this.showLoader();
    return this.http.get(path)
      .pipe(timeout(this.maxTimeout), map(res => {
        this.hideLoader();
        return this.extractData(res);
      }),
        catchError(err => {
          this.hideLoader();
          return throwError(err);
        }));
  }

  postAction(path: string, body: any) {
    this.spinner.show();
    return this.http.post(path, body)
      .pipe(timeout(this.maxTimeout), map(res => {
        this.hideLoader();
        return this.extractData(res);
      }),
        catchError(err => {
          this.hideLoader();
          return throwError(err);
        }));
  }

  showLoader() {
    this.spinner.show();
  }

  hideLoader() {
    this.spinner.hide();
  }

  private extractData(res: any) {
    if (res && res.status === 200) {
      return res.json() || {};
    } else {
      return res || {};
    }
  }
}
