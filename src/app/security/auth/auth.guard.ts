import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  /**
   * Determines whether the route can be activated.
   * If the user is authenticated (i.e., token is present in localStorage), the route is allowed.
   * Otherwise, the user is redirected to the login page.
   */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    try {
      const token = localStorage.getItem('token');  // Retrieve token from localStorage
      if (token) {
        return true;  // Allow navigation if token exists
      } else {
        this.router.navigate(['']);  // Redirect to login page if token is not found
        return false;  // Prevent route activation
      }
    } catch (ex) {
      console.error('AuthGuard Exception:', ex);  // Log any unexpected errors
      return false;  // Block route in case of an exception
    }
  }
}
