import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { User } from '../model/user';
import { SessionStoreService } from './session-store.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isAuthenticated: boolean = false;

  baseURL: string = "https://jsonplaceholder.typicode.com/todos/1";

  constructor(private router: Router, private sessionStore: SessionStoreService,
    private http: HttpClient) { }

  validateUser(user: User): Observable<any> {

    // const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(user);
    // return this.http.post<any>(this.baseURL, body, { 'headers': headers })

    return this.http.get<any>(this.baseURL)
      .pipe(
        catchError(this.handleError)
      );
  }

  logout() {
    this.isAuthenticated = false;
    this.router.navigate(['/home']);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
