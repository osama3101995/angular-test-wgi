import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddEmployeeComponent } from './pages/add-employee/add-employee.component';
import { EmployeeDetailsComponent } from './pages/employee-details/employee-details.component';
import { AuthGuard } from '@auth0/auth0-angular';

export const routes: Routes = [
  {path: '', component : HomeComponent},
  {path: 'employee/add', component : AddEmployeeComponent, canActivate: [AuthGuard]},
  {path: 'employee/view/:id', component : EmployeeDetailsComponent, canActivate: [AuthGuard]},
];
