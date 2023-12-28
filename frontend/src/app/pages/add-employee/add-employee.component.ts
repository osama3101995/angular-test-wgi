import { Component } from '@angular/core';
import { EmployeesService } from '../../services/employees.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { Alert } from '../../models/alert.model';
import { AlertComponent } from '../../components/alert/alert.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule, AlertComponent],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
})
export class AddEmployeeComponent {


  public alerts : Alert | null = null

  constructor(private EmployeeService: EmployeesService,
    private router: Router) {}

  AddEmployeeSubmit(employeeAdd: NgForm) {
    const { first_name, last_name, avatar, position, phone_number } =
      employeeAdd.value;


    const employee: Employee = {

      first_name,
      last_name,
      avatar,
      position,
      phone_number,
    };
    this.EmployeeService.addEmployee(employee).subscribe({
      next: (res) => {
        this.alerts = {
          status : 200,
          title : "User Added Successfully! You will be redirected back shortly"
        }
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
        console.log(res)
      },
      error : (err)=>{
        this.alerts = err.error
      }
    });;
  }
}
