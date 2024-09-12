import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedService } from '../../service/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private sharedService: SharedService,
    private route: Router
  ) { }

  errorMsg: string = '';
  loginData = {
    username: '',
    otp: ''
  };

  onSubmit(): void {
    if (this.loginData.username == '' || this.loginData.otp == '') {
      this.errorMsg = 'Please fill all the fields';
      setTimeout(() => {
        this.errorMsg = '';
      }, 1000);
    } else {
      this.sharedService.login(this.loginData).subscribe((response) => {
        alert('Login successful');
        this.route.navigate(['/dash']);
      }, error => {
        this.errorMsg = 'Invalid Details';
        setTimeout(() => {
          window.location.reload();
          this.errorMsg = '';
        }, 1000);
      });
    }
  }
}
