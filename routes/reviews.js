var express = require("express");
var router = express.Router();
var Review = require("../models/review");
var User = require("../models/user");


router.get("/reviews", function (req, res) {
	Review.getAll(function (err, data) {
		res.status(err ? 400 : 200).send( err || data );
	});
});

router.post("/reviews/:userId", function (req, res) {

	object = {
		userId: req.params.userId,
		book: req.body.book,
		review: req.body.review
	};

	Review.createReview(object, function (err, user){
		res.status(err ? 400 : 200).send( err || user );
	});
});

router.delete("/reviews/:reviewId", function (req, res) {
	Review.deleteReview(req.params.id, function (err) {
		res.status(err ? 400 : 200).send(err);
	});
})

router.put("/reviews/:reviewId", function (req, res) {
	var object = req.body;
	object.reviewId = req.params.reviewId;
	console.log(object);
	Review.update(object, function (err, updatedObj) {
		res.status(err ? 400 : 200).send( err || updatedObj);
	});
})

module.exports = router;