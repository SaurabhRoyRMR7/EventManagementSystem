import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  
  login(): void {
    this.userService.login(this.loginData.email, this.loginData.password).subscribe(
      response => {
      console.log("res", response);
        this.userService.saveUserDetails(response.userId, response.userRole);
        this.toastr.success('Login successful');
        // Navigate to the dashboard or home page based on role

        this.router.navigate(['/dashboard']);
       
      },
      error => {
        alert('Invalid email or password');  // Show alert window
        console.error('Login failed', error);
        this.toastr.error('Invalid email or password');
        console.error(error);
      }
    );
  }
  navigateToRegister() {
    this.router.navigate(['/register']);  // Navigate to the /register route
  }
}
