require('dotenv').config({path: __dirname + '/.env'});
require('./db');
const express = require('express');
const app = express();
const routes = require('./routes/routes');
// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));


// Other middleware and configurations...

// Mount the routes
 app.use('/', routes);

// app.get('/', (req, res) => {
//     res.send('Hello World!');
//     });
	

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
