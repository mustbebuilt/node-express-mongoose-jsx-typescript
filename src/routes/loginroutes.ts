import express, { Request, Response, Router } from "express";
import * as loginController from "../controllers/logincontrollers";

const router: Router = express.Router();

router.get("/signup", (req: Request, res: Response) => { 
  res.render("signup", { title: "Sign Up" , loggedIn : req.session.login });
});

router.post("/signup", loginController.createUser);

router.get("/login", (req: Request, res: Response) => { 
  res.render("login", { title: "Login", loggedIn : req.session.login });
});

router.post("/login", loginController.loginUser);

router.get("/logout", (req: Request, res: Response) => {
  // Clear the session login value
  req.session.login = null;

  // Clear the session cookie (optional)
  res.clearCookie("session");

  // Redirect the user to a desired page (e.g., home page)
  res.redirect("/");
});


export default router;
