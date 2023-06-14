import { Request, Response, NextFunction } from 'express';

// Middleware to check if user is logged in
export function auth(req: Request, res: Response, next: NextFunction): void {
  // Check if the session variable 'login' exists and is set to true
  if (req.session.login === true) {
    // User is logged in, proceed to the next middleware/route handler
    next();
  } else {
    // User is not logged in, redirect to the login page or show an error
    res.redirect('/login'); // Adjust the login route URL as per your application
  }
}
