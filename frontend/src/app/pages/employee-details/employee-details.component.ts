import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from '../../services/employees.service';
import { Employee } from '../../models/employee.model';
import { FormsModule, NgForm } from '@angular/forms';
import { Alert } from '../../models/alert.model';
import { AlertComponent } from '../../components/alert/alert.component';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [FormsModule, AlertComponent],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
})
export class EmployeeDetailsComponent implements OnInit {
  private id: string | null = null;
  public employee: Employee = {
    id : '',
    first_name : '',
    last_name : '',
    position : '',
    phone_number : 0,
    avatar : '',
  };
  public alerts : Alert | null = null

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private EmployeeService: EmployeesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((paramMap) => {
      this.id = paramMap.get('id');
    });

    if (this.id) {
      this.EmployeeService.getEmployee(this.id).subscribe({
        next: (employee) => {
          this.employee = employee;
        },
      });
    }
  }

  UpdateEmployeeSubmit(employeeUpdate: NgForm) {

    const {
      first_name = this.employee?.first_name,
      last_name = this.employee?.last_name,
      avatar = this.employee?.avatar,
      position = this.employee?.position,
      phone_number = this.employee?.phone_number,
    } = employeeUpdate.value;

    if (this?.employee?.id) {
      const employee: Employee = {
        id: this.employee.id,
        first_name,
        last_name,
        avatar,
        position,
        phone_number,
      };
      this.EmployeeService.updateEmployee(employee).subscribe({
        next: (res) => {
          this.alerts = {
            status : 200,
            title : "User Updated Successfully! You will be redirected back shortly"
          }
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        },
        error : (err)=>{
          this.alerts = err.error
        }
      });
    }
  }

  DeleteEmployee(){
    if (this?.employee?.id) {
      this.EmployeeService.deleteEmployee(this.employee.id).subscribe({
        next: (res) => {
          this.alerts = {
            status : 200,
            title : "User Deleted Successfully! You will be redirected back shortly"
          }
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        },
        error : (err)=>{
          this.alerts = err.error
        }
      });
    }

  }
}
