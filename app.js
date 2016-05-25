'use strict';

const PORT = process.env.PORT || 3000;

require('dotenv').config();

var express = require('express');
var morgan = require('morgan');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const MONGOURL = process.env.MONGODB_URI || 'mongodb://localhost/beer-reviews';

mongoose.connect(MONGOURL, err => {
  console.log(err || `MongoDB connected to ${MONGOURL}`);
});


var app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use("/", require("./routes/users"));
app.use("/", require("./routes/reviews"));
app.use("/", require("./routes/beerAPI"));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

var server = http.createServer(app);


server.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
});

// http://api.brewerydb.com/v2/?key=31fc9f293dc04a19d57ca04dd0656dbc/brewery/:breweryId/beers
// http://api.brewerydb.com/v2/?key=31fc9f293dc04a19d57ca04dd0656dbc/?brewery/
// http://api.brewerydb.com/v2/?key=31fc9f293dc04a19d57ca04dd0656dbc/beer/
// http://api.brewerydb.com/v2/?key=31fc9f293dc04a19d57ca04dd0656dbc/beers/
// http://api.brewerydb.com/v2/?key=31fc9f293dc04a19d57ca04dd0656dbc/beer/oeGSxs
// http://api.brewerydb.com/v2/?key=31fc9f293dc04a19d57ca04dd0656dbc/?=type/beer
// http://api.brewerydb.com/v2/?key=31fc9f293dc04a19d57ca04dd0656dbc/?type=beer
// http://api.brewerydb.com/v2/?key=31fc9f293dc04a19d57ca04dd0656dbc/?type=beer/
// http://api.brewerydb.com/v2/?key=31fc9f293dc04a19d57ca04dd0656dbc/?type=beer/beer/random
// http://api.brewerydb.com/v2/?key=31fc9f293dc04a19d57ca04dd0656dbc/beer/random
// http://api.brewerydb.com/v2/?key=31fc9f293dc04a19d57ca04dd0656dbc/?type=beer/random
