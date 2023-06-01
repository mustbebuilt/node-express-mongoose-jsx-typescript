require("dotenv").config();
require("./db");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const routes = require("./routes/routes");

// Set EJS as the view engine
app.set("view engine", "ejs");

app.use(cookieParser());

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Mount the routes
app.use("/", routes);

// app.get('/', (req, res) => {
//     res.send('Hello World!');
//     });

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
