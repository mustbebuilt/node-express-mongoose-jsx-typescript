import dotenv from "dotenv";
import "./db";
import express, { Application, Request, Response } from "express";
import path from "path";
import session from 'express-session';
import routes from "./routes/routes";
import cmsroutes from "./routes/cmsroutes";
import loginroutes from "./routes/loginroutes";
import { auth } from "./authenticate";

dotenv.config();
const app: Application = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Configure session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret',
    resave: false,
    saveUninitialized: false,
  })
);

// Mount the routes
app.use("/", routes);
app.use("/cms", auth, cmsroutes);
app.use("/", loginroutes);

// Serve static files
app.use(express.static("src/public"));

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
