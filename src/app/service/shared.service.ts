import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  // Base URL for the API
  private apiBaseURL: string = 'https://assignment.stage.crafto.app/';
  
  // Token to store user session
  private tkn: any;

  constructor(
    private route: Router,
    private httpClient: HttpClient,
  ) { }

  /**
   * Logs in the user by sending login data to the server.
   * @param data - The login credentials (email, password, etc.).
   * @returns An observable that emits the server response or error.
   */
  login(data: any): Observable<any> {
    return this.httpClient
      .post(this.apiBaseURL + 'login', data)
      .pipe(
        map((response) => {
          // Store the token in local storage
          this.tkn = response;
          localStorage.setItem('token', this.tkn.token);
          return response;
        }),
        catchError((error) => {
          // Return the error message in case of failure
          return throwError(error?.error?.msg);
        }),
      );
  }

  /**
   * Logs out the user by clearing the local storage and navigating to the home page.
   */
  logout(): void {
    localStorage.removeItem("token");
    localStorage.clear();
    this.route.navigate(['']);
  }

  /**
   * Fetches a paginated list of quotes from the server.
   * @param limit - The number of quotes to fetch.
   * @param offset - The starting position for fetching the quotes.
   * @returns An observable that emits the list of quotes.
   */
  getQuotes(limit: number, offset: number): Observable<any> {
    const url = `${this.apiBaseURL}getQuotes?limit=${limit}&offset=${offset}`;
    return this.httpClient.get(url);
  }

  /**
   * Uploads an image by sending a form data object to the server.
   * @param formData - The form data containing the image to be uploaded.
   * @returns An observable that emits the server response.
   */
  createImageUrl(formData: any): Observable<any> {
    return this.httpClient.post('https://crafto.app/crafto/v1.0/media/assignment/upload', formData);
  }

  /**
   * Creates a new quote by sending the quote data to the server.
   * @param formData - The form data containing the quote details.
   * @returns An observable that emits the server response.
   */
  createQuote(formData: any): Observable<any> {
    return this.httpClient.post(this.apiBaseURL + 'postQuote', formData);
  }
}
