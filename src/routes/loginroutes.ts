import express, { Request, Response, Router } from "express";
import * as loginController from "../controllers/logincontrollers";

const router: Router = express.Router();

router.get("/register", (req: Request, res: Response) => {
  res.render("register", { title: "Register", loggedIn: req.session.login });
});

router.post("/register", loginController.createUser);

router.get("/login", (req: Request, res: Response) => {
  res.render("login", { title: "Login", loggedIn: req.session.login });
});

router.post("/login", loginController.loginUser);

router.get("/logout", (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});


export default router;
