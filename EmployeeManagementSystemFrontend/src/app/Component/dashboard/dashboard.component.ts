import { Component, inject, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Employee } from '../../Model/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

    employees: any[] = [];
    searchText: string = '';
    addEmployeeForm: FormGroup;

    employeeService= inject(EmployeeService);
  
   

  constructor(private fb: FormBuilder) {
    this.addEmployeeForm = this.fb.group({

      id: [''],
      fullname: ['', [Validators.required]],
      age: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      jobTitle: ['', [Validators.required]],
      department: ['', [Validators.required]],
      isDeleted: [false],
    });

    
  }  
    ngOnInit(): void {
      this.loadEmployees();
    }
    
    isLoading = false;
    selectedEmployee: any;

    onSubmit() {
      this.isLoading = true;
      alert('Registering... Please wait');
  
      console.log(this.addEmployeeForm.value);
      
      const formData = this.addEmployeeForm.value;
  
      this.employeeService.addEmployee(this.addEmployeeForm.value).subscribe({
        next: (res) => {
          alert('Success! Employee Registered Successfully');
          this.loadEmployees(); // Reload employees list
        },
        error: (err) => {
          console.error('Error:', err);
          alert('Registration Failed! Failed to register employee. Please try again.');
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }


  
    loadEmployees() {
      debugger
      this.employeeService.getEmployees().subscribe((res:any) => {
        console.log(res);

        this.employees = res;
      });
    }
    viewEmployee(employee: Employee): void {
      this.selectedEmployee = employee;

      // Update the form with selected employee's data
      this.addEmployeeForm.patchValue({
        fullname: employee.fullname,
        age: employee.age,
        gender: employee.gender,
        email: employee.email,
        phone: employee.phone,
        jobTitle: employee.jobTitle,
        department: employee.department,
      });

      // Open the modal
      const modalElement = document.getElementById('viewEmployeeModal');
      if (modalElement) {
        const myModal = new bootstrap.Modal(modalElement, {
          keyboard: false,
        });
        myModal.show();
      } else {
        console.error('Modal element not found');
      }
    }
  
    editEmployee(employee: Employee): void {
      this.selectedEmployee = employee;
    
      // Update the form with selected employee's data
      this.addEmployeeForm.patchValue({
        fullname: employee.fullname,
        age: employee.age,
        gender: employee.gender,
        email: employee.email,
        phone: employee.phone,
        jobTitle: employee.jobTitle,
        department: employee.department,
      });
    
      // Open the modal
      const modalElement = document.getElementById('updateEmployeeModal');
      if (modalElement) {
        const myModal = new bootstrap.Modal(modalElement, {
          keyboard: false,
        });
        myModal.show();
      } else {
        console.error('Modal element not found');
      }
    }

    deleteEmployee(id: number) {
      const isDelete = confirm("Are you sure you want to delete?");
      if (isDelete) {
        this.employeeService.deleteEmployee(id).subscribe({
          next: (res: any) => {
            // Check if response is truthy or status is success
            alert("Employee Has Been Deleted Successfully");
            this.loadEmployees(); // Reload the employee list
          },
          error: (err) => {
            console.error("Error deleting employee:", err);
            alert("Failed to delete employee. Please try again.");
          },
        });
      }
    }
    
    onUpdate(){
      this.isLoading = true;
      alert('Updating... Please wait');
  
      console.log(this.addEmployeeForm.value);
      // MARKED CHANGE: Extract raw form values instead of passing FormGroup
      
      const formData = this.addEmployeeForm.value;
  
      this.employeeService.updateEmployee(this.selectedEmployee.id, this.addEmployeeForm.value).subscribe({
        next: (res) => {
          alert('Success! Employee Updated Successfully');
          this.loadEmployees(); // Reload employees list
        },
        error: (err) => {
          // MARKED CHANGE: Improved error handling
          console.error('Error:', err);
          alert('Update Failed! Failed to update employee. Please try again.');
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }

  

    openAddForm() {
      const modalElement = document.getElementById('addEmployeeModal');
      if (modalElement) {
        var myModal = new bootstrap.Modal(modalElement, {
            keyboard: false
        });
        myModal.show();
      } else {
        console.error('Modal element not found');
      }
  }
}
