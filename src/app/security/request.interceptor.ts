import { HttpErrorResponse, HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map, tap } from 'rxjs';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {

  // Get the token from localStorage
  const token = localStorage.getItem('token'); // Adjust 'token' to the key you use

  // Clone the request to add the Authorization header with the token
  req = req.clone({ setHeaders: { Authorization: `${token}` } });

  // Pass the cloned request instead of the original request to the next handler
  return next(req);
}