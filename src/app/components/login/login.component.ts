import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedService } from '../../service/shared.service';
import { Router } from '@angular/router';
import { AppConstants } from '../../security/app.constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // Error message to display validation or server errors
  errorMsg: string = '';

  // Data model for the login form
  loginData = {
    username: '',
    otp: '',
  };

  constructor(private sharedService: SharedService, private route: Router) {}

  /**
   * Submits the login form after validating input fields.
   * If valid, it sends the login data to the server.
   */
  onSubmit(): void {
    // Validate form fields
    if (this.loginData.username === '' || this.loginData.otp === '') {
      this.errorMsg = 'Please fill all the fields';

      // Clear the error message after 1 second
      setTimeout(() => {
        this.errorMsg = '';
      }, 1000);
    } else {
      // Call login service with the login data
      this.sharedService.login(this.loginData).subscribe(
        (response) => {
          alert('Login successful');
          // Navigate to dashboard on successful login
          this.route.navigate([AppConstants.URLs.DASHBOARD]);
        },
        (error) => {
          // Show error message on invalid details
          this.errorMsg = 'Invalid Details';

          // Reload page and clear error message after 1 second
          setTimeout(() => {
            window.location.reload();
            this.errorMsg = '';
          }, 1000);
        }
      );
    }
  }
}
