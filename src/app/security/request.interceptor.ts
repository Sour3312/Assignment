import { HttpInterceptorFn } from '@angular/common/http';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {

  // Retrieve the token from localStorage (adjust 'token' if you're using a different key)
  const token = localStorage.getItem('token');

  // Clone the request and attach the Authorization header with the token if it exists
  req = req.clone({
    setHeaders: {
      Authorization: token ? token : ''
    }
  });

  // Pass the modified request to the next handler in the chain
  return next(req);
};
