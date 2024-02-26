import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {


  baseApiUrl : string = environment.baseApiUrl+"/api/Employees";
  httpHeaders : { [key : string] : HttpHeaders | null } = {headers : null};


  constructor(private http : HttpClient, auth : AuthService) {

    auth.idTokenClaims$.subscribe({
      next : (res) => {
      const token: HttpHeaders = new HttpHeaders({
          Authorization: 'Bearer '+ res?.__raw,
          //'Content-Type': 'multipart/form-data',
      });
        this.httpHeaders = {
          headers : token
        };
      }
    })



  }


  getAllEmployees() :Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseApiUrl)
  }

  getEmployee(id : string) :Observable<Employee>{
    return this.http.get<Employee>(this.baseApiUrl+`/${id}`)
  }

  addEmployee(employee : any) :Observable<Employee>{

    return this.http.post<Employee>(this.baseApiUrl,employee, this.httpHeaders)
  }

  updateEmployee(employee : Employee){
    return this.http.put<Employee>(this.baseApiUrl,employee, this.httpHeaders)
  }

  deleteEmployee(id : string){
    return this.http.delete<Employee>(this.baseApiUrl+`/${id}`, this.httpHeaders)
  }

  searchEmployees(search : string) {
    return this.http.get<Employee[]>(this.baseApiUrl+`/search?q=${search}`, this.httpHeaders)
  }

}
