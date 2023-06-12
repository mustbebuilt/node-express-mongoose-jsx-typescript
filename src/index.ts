import dotenv from "dotenv";
import "./db";
import express, { Application, Request, Response } from "express";
import path from "path";
import routes from "./routes/routes";
import cmsroutes from "./routes/cmsroutes";

dotenv.config();
const app: Application = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Mount the routes
app.use("/", routes);
app.use("/", cmsroutes);

// Serve static files
app.use(express.static("./dist/public"));


// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});