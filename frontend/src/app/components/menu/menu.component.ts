import { Component } from '@angular/core';
import {AuthService} from "../../_services/auth.service";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(public authService: AuthService) {}
}
