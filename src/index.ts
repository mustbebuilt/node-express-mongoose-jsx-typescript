import dotenv from "dotenv";
import "./db";
import express, { Application, Request, Response } from "express";
import routes from "./routes/routes";

dotenv.config();
const app: Application = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Mount the routes
app.use("/", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});