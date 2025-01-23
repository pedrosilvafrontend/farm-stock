import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, MatListModule, MatIconModule],
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss']
})
export class MenuComponent {}
