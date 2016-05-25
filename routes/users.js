var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Review = require("../models/review");

	
router.get("/users", function (req, res) {
	
	User.getAll(function (err, users) {
		res.status(err ? 400 : 200).send( err || users );
	});
});

//user registration
router.post("/users/register", function (req, res) {
	
	User.register(req.body, function(err, user) {
		res.status(err ? 400 : 200).send( err || user );
	});
});

//user login
router.post("/login", function (req, res) {

	User.login(req.body, function(err, token){
	    if(err) return res.status(400).send(err);
	    res.cookie('accessToken', token).send(token);		
	});
	
});

//get user's reviews (profile page)
router.get("/profile", User.isLoggedIn, function (req, res) {
	console.log("User:", req.user);
	res.send(req.user);
});


//log out, clear cookie
router.delete('/logout', (req, res) => {
  res.clearCookie('accessToken').send();
});


module.exports = router;