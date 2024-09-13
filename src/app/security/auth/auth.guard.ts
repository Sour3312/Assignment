import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { AppConstants } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private route: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    try {
      const token = localStorage.getItem('token');  // Retrieve token from localStorage
      if (token) {
        return true;  // Allow navigation if token exists
      } else {
        this.route.navigate([AppConstants.URLs.HOME]);
        // Redirect to login page if token is not found
        return false;  // Prevent route activation
      }
    } catch (ex) {
      console.error('AuthGuard Exception:', ex);  // Log any unexpected errors
      return false;  // Block route in case of an exception
    }
  }
}
