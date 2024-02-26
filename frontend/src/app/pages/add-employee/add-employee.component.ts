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

  public fileUpload : any | null = null

  constructor(private EmployeeService: EmployeesService,
    private router: Router) {}

  FileUploadedEvent(event: any) {

    if(event?.target?.files){
      const fileList : FileList = event.target.files
      this.fileUpload = []
      for (let index = 0; index < fileList.length; index++) {
        this.fileUpload.push(fileList.item(index))
      }
    }

  }

  AddEmployeeSubmit(employeeAdd: NgForm) {
    const { first_name, last_name, avatar, position, phone_number } =
      employeeAdd.value;


    const formData = new FormData();
    formData.append("first_name", first_name)
    formData.append("last_name", last_name)
    formData.append("position", position)
    formData.append("phone_number", phone_number)
    if(this.fileUpload){
      for (let index = 0; index < this.fileUpload.length; index++) {
        formData.append("avatar", this.fileUpload[index])
      }

    }

    console.log(formData);


    this.EmployeeService.addEmployee(formData).subscribe({
      next: (res) => {
        this.fileUpload = null;
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
        this.fileUpload = null;
        this.alerts = err.error
      }
    });
  }
}
