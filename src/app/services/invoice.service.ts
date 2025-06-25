import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Invoice } from '../models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  baseUrl = "http://localhost:5000/api/Invoice";
  constructor(private http: HttpClient) { }

  //Generate Invoice
  generatetInvoices(model: Invoice):Observable<any>{
    return this.http.post<any>(this.baseUrl,model,{
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  //Handle errors
    private handleError(error: any): Observable<never> {
    console.log(error)
    console.log('An error occurred:', error);
    return throwError('Something went wrong; please try again later!');
  }
}
