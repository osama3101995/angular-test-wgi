import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { TableComponent } from '../../components/table/table.component';
import { EmployeesService } from '../../services/employees.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, TableComponent, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  employees : Employee[] = []
  loading : boolean = false;
  constructor(private employeesServices : EmployeesService){}
  search : string = '';
  ngOnInit() : void {

    this.employeesServices.getAllEmployees().subscribe({
      next : (employees) => {
        this.employees = employees;
      },
      error: (error) => {console.log(error)},
    })


  }

  Search() {
    this.loading = true;
    this.employeesServices.searchEmployees(this.search).subscribe({
      next : (employees) => {
        this.employees = employees;
        this.loading = false;
        console.log(employees)
      },
      error: (error) => {
        console.log(error)
        this.loading = false;
      },
    })
  }
}
