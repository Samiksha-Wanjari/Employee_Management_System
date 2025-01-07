import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../Model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  private apiUrl = 'http://localhost:7138/api/Employees';

  getemployees = 'https://localhost:7138/api/Employees/GetEmployees';

  addemployee = 'https://localhost:7138/api/Employees/AddEmployee';

  deleteemployee = 'https://localhost:7138/api/Employees/DeleteEmployee';

  updateemployee = 'https://localhost:7138/api/Employees/UpdateEmployee';


  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any> {
    return this.http.get<any>(this.getemployees);
  }
 

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl+'/GetEmployees'}/${id}`);
  }

  addEmployee(data:any): Observable<any>{
    return this.http.post(this.addemployee, data);
  }


// Update patient
updateEmployee(id:number, data:any): Observable<any> {
  return this.http.put(`${this.updateemployee}/${id}`, data);
}

   // Delete a patient
   deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.deleteemployee}/${id}`);
  }
}
  

