import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private route: Router,
    private httpClient: HttpClient,
  ) { }

  private apiBaseURL: any = 'https://assignment.stage.crafto.app/';
  private tkn: any;

  initLogin() {
    debugger;
    if (localStorage.getItem('userDetails')) {
      console.log('already loggedIn!!');
      const paramsString = window.location.href.split('#')[1];
      if (paramsString) {
        this.route.navigate(['/main/' + paramsString]);
      } else {
        this.route.navigate(['/login']);
        return;
      }
      return;
    } else {
      this.route.navigate(['/login']);
      return;
    }
  }

  login(data: any): Observable<any> {
    return this.httpClient
      .post(this.apiBaseURL + 'logIn', data)
      .pipe(
        map((response) => {
          this.tkn = response;
          localStorage.setItem('token', this.tkn.token);
          return response;
        }),
        catchError((error) => {
          return throwError(error.error.msg);
        }),
      );
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.clear();
    this.route.navigate(['']);
  }

  getQuotes(limit: number, offset: number): Observable<any> {
    const url = `${this.apiBaseURL}getQuotes?limit=${limit}&offset=${offset}`;
    return this.httpClient.get(url);
  }

  createImageUrl(formData: any) {
    return this.httpClient.post('https://crafto.app/crafto/v1.0/media/assignment/upload', formData);
  }

  createQuote(formData: any) {
    return this.httpClient.post(this.apiBaseURL + 'postQuote', formData);
  }
}
