import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [RouterLink,NgIf, AsyncPipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnChanges {

  @Input() employees : Employee[] = []

  constructor(public auth : AuthService) {}

  ngOnChanges( changes : SimpleChanges) : void {
    if (changes['employees']) {
      this.employees = changes['employees'].currentValue;
    }
  }
}
