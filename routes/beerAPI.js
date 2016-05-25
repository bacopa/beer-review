var express = require("express");
var path = require("path");
var router = express.Router();
var request = require('request');
var beerKey = process.env.beerAPI_KEY;

var beerObject;

router.get("/getbeer", function (req, res) {
	
	var beerUrl = "http://api.brewerydb.com/v2/beer/random/?key=" + beerKey;

	var beerRequest = request(beerUrl, 
		function (err, response, body) {
			if(err){
				console.log("err", err);
			}

			//console.log("**** body ****", body);
			
			beerObject = JSON.parse(body);
			if(beerObject){
				//console.log("beerObject inside request", beerObject);
				console.log("beerObject inside request beerObject.data", beerObject.data);
				//res.status(err ? 400 : 200).send(err || JSON.stringify(JSON.parse(body), null, 2));
				res.send(beerObject.data);
			}
	});




});


module.exports = router;


// get a random beer!!!!
// http://api.brewerydb.com/v2/beer/random/?key=31fc9f293dc04a19d57ca04dd0656dbc
// res.status(err ? 400 : 200).send(err || JSON.stringify(JSON.parse(body), null, 2));

