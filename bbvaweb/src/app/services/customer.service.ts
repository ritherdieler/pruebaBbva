import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Customer} from "../models/response/Customer";
import {UpdateCustomerRequest} from "../models/request/UpdateCustomerRequest";
import {SaveCustomerRequest} from "../models/request/SaveCustomerRequest";


const BASE_URL = "http://127.0.0.1:8083/reto/services/clients"
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(BASE_URL+"");
  }

  getCustomerById(customerId:number): Observable<Customer>{
    return this.http.get<Customer>(BASE_URL+"/"+customerId)
  }

  saveCustomer(request:SaveCustomerRequest): Observable<Customer>{
    return this.http.post<Customer>(BASE_URL,request,httpOptions)
  }

  updateCustomer(customerId:number, request:UpdateCustomerRequest):Observable<any>{
    return this.http.put<any>(BASE_URL+"/"+customerId,request)
  }

  deleteCustomer(customerId:number):Observable<any>{
    return this.http.delete(BASE_URL+"/"+customerId)
  }

}
