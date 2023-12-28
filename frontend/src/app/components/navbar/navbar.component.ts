import { AsyncPipe, DOCUMENT, NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}

  menuToggle : boolean = false;

  ngOnInit(): void {

  }

  toggleMenuState() {
    this.menuToggle = !this.menuToggle
  }

}
