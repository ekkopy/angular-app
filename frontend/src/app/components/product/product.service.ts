import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model'
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3000/products"

  constructor(private snackBar: MatSnackBar,
    private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  // Register new product on backend
  create(product: Product) : Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map((obj) => obj),
      catchError((error) => this.errorHandler(error))
    );
  }
  
  // Get all register from json database
  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((error) => this.errorHandler(error))
    );
  }
  
  // Only one
  readById(id: number) : Observable<Product> {
    let url = `${this.baseUrl}/${id}`
    return  this.http.get<Product>(url).pipe(
      map((obj) => obj),
      catchError((error) => this.errorHandler(error))
    );
  }

  // Update products
  update(product: Product) : Observable<Product> {
    let url = `${this.baseUrl}/${product.id}`
    return this.http.put<Product>(url, product).pipe(
      map((obj) => obj),
      catchError((error) => this.errorHandler(error))
    );
  }

  // Delete products
  delete(id: number) : Observable<Product> {
    let url = `${this.baseUrl}/${id}`
    return this.http.delete<Product>(url).pipe(
      map((obj) => obj),
      catchError((error) => this.errorHandler(error))
    );
  }

  // Handle errors
  errorHandler(error: any) : Observable<any> {
    this.showMessage('Something get wrong =(!', true)
    return EMPTY
  }

}
