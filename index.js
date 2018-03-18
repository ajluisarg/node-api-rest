const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

const app = express();
const bodyParser = require('body-parser');

const { port, database } = require('./config');


//= ===============================
// --Setting up MIDDLEWARE for all Express requests--
//= ===============================

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable CORS from client-side
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS, PATCH');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials',
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Start the server
app.listen(port);
console.log(`Your server is running on port ${port}.`);
// Database Connection
console.log(`Connecting to database: ${database}`);

mongoose.connect(database);


router(app);
