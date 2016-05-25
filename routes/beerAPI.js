var express = require("express");
var path = require("path");
var router = express.Router();
var request = require('request');
var beerKey = process.env.beerAPI_KEY;


router.get("/getbeer", function (req, res) {
	console.log("/getbeer route");
	var beerUrl = "http://api.brewerydb.com/v2/beer/random/?key=" + beerKey;

	request(beerUrl, 
		function (err, response, body) {
			console.log("err", err);
			console.log("response", response);
			console.log("body", body);
	});

	console.log("beerUrl", beerUrl);

});

module.exports = router;


// get a random beer!!!!
// http://api.brewerydb.com/v2/beer/random/?key=31fc9f293dc04a19d57ca04dd0656dbc

