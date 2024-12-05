import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  loggedIn: Boolean = true;

  constructor(private userService: UserService, private router: Router) {}

  handleLogout(): void {
    // Call the logout method from the UserService
    this.userService.logout();
    
    // Update the loggedIn status to false
    this.loggedIn = false;

    // Redirect to the login page
    this.router.navigate(['/login']);
  }
 
}
