"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
require("./db");
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware for parsing JSON bodies
app.use(express_1.default.json());
// Middleware for parsing URL-encoded bodies
app.use(express_1.default.urlencoded({ extended: true }));
// Mount the routes
app.use("/", routes_1.default);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// Start the server
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
