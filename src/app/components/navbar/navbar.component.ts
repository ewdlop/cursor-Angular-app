import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(-10px)'
      })),
      state('*', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition(':enter', [
        animate('300ms ease-out')
      ]),
      transition(':leave', [
        animate('200ms ease-in')
      ])
    ]),
    trigger('slideInOut', [
      state('void', style({
        transform: 'translateX(-100%)'
      })),
      state('*', style({
        transform: 'translateX(0)'
      })),
      transition(':enter', [
        animate('300ms ease-out')
      ]),
      transition(':leave', [
        animate('200ms ease-in')
      ])
    ]),
    trigger('scaleInOut', [
      state('void', style({
        transform: 'scale(0.8)',
        opacity: 0
      })),
      state('*', style({
        transform: 'scale(1)',
        opacity: 1
      })),
      transition(':enter', [
        animate('300ms ease-out')
      ]),
      transition(':leave', [
        animate('200ms ease-in')
      ])
    ])
  ]
})
export class NavbarComponent {
  isScrolled = false;
  isLoggedIn = false;

  constructor(public authService: AuthService) {
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }

  logout() {
    this.authService.logout();
  }
}
