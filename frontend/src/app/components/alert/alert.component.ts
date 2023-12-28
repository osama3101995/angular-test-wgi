import { Component, Input, SimpleChanges } from '@angular/core';
import { Alert } from '../../models/alert.model';
import { KeyValuePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgFor, KeyValuePipe, NgIf],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {


  @Input() alerts : Alert | null = null;


  ngOnChanges( changes : SimpleChanges) : void {
    if (changes['alerts']) {
      this.alerts = changes['alerts'].currentValue;

    }
  }

}
