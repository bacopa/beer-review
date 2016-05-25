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


			beerObject = JSON.parse(body).data;
			if(beerObject){
				//console.log("beerObject inside request", beerObject);
				//console.log("beerObject inside request beerObject***", beerObject);
				console.log("beer name:", beerObject.name);
				console.log("brewery:", beerObject.style.category.name);
				console.log("description:", beerObject.description);
				console.log("abv:", beerObject.abv);
				res.send(beerObject.data);
			}
	});

//beerRequest is undefined 


});


module.exports = router;

//res.status(err ? 400 : 200).send(err || JSON.stringify(JSON.parse(body), null, 2));

// get a random beer!!!!
// http://api.brewerydb.com/v2/beer/random/?key=31fc9f293dc04a19d57ca04dd0656dbc
// res.status(err ? 400 : 200).send(err || JSON.stringify(JSON.parse(body), null, 2));

