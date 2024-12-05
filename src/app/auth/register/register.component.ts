import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registrationData = {
    name: '',
    email: '',
    password: '',
    googleId: '',
    userRoleId: '' ,
    organizationName: '',  
    contactInfo: '' 
  };

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  register() {
    
    if (this.registrationData.userRoleId === '8' && (!this.registrationData.organizationName || !this.registrationData.contactInfo)) {
      this.toastr.error('Please provide organization name and contact info for organizers.');
      return;  
    }
    console.log(this.registrationData,'rd')

    this.userService.registerUser(this.registrationData).subscribe(
      (response) => {
        this.toastr.success('User registered successfully');
        this.router.navigate(['/login']);
      },
      (error) => {
        alert(error.error);
        console.log(error.error)  // Show alert window
     
        this.toastr.error('Error registering user');
        console.error(error);
      }
    );
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
