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

const MONGOURL = process.env.MONGODB_URI || 'mongodb://localhost/book-reviews';

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

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

var server = http.createServer(app);


server.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
});
