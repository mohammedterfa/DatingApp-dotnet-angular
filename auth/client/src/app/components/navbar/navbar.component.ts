import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(public authService: AuthService,
    private matSnackBar : MatSnackBar, private router : Router){}

  isLoggedIn()
  {
    return this.authService.isLoggedIn();
  }

  logout()
  {
    this.authService.logout();
    this.matSnackBar.open('Logged out successfully', 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
    });

    this.router.navigate(['/login']);
  }

}
