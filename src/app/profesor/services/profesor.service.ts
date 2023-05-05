import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Evaluacion} from "../model/evaluacion";

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  basePath = 'http://localhost:3000/evaluaciones';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(private http: HttpClient) { }

  // Get All Evaluaciones
  getAll(): Observable<Evaluacion> {
    return this.http.get<Evaluacion>(this.basePath, this.httpOptions)
      .pipe(retry(2),
        catchError(this.handleError));
  }

  // Create Evaluacion
  create(item: any): Observable<Evaluacion> {
    return this.http.post<Evaluacion>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Update Student
  update(id: any, item: any): Observable<Evaluacion> {
    return this.http.put<Evaluacion>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Delete Student
  delete(id: any) {
    return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }


  // API Error Handling
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Default error handling
      console.log(`An error occurred: ${error.error.message} `);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    // Return Observable with Error Message to Client
    return throwError(() => new Error('Something happened with request, please try again later'));
  }
}
