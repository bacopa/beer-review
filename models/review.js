var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = mongoose.model("User");

var reviewSchema = new mongoose.Schema({

	review: { type: String, required: true },
	book: { type: String, required: true },
	_user: { type: Schema.Types.ObjectId, ref: 'User' }

});



//middleware
reviewSchema.statics.getAll = function (cb) {
	Review.find({}, function (err, reviews) {
		if(err){ cb(err) }
		cb(null, reviews);
	});
};

reviewSchema.statics.createReview = function (obj, cb) {

	console.log(obj);

	var userId = obj.userId;
	var review = obj.review;
	var book = obj.book;

	User.findOne({_id: userId}, function (err, user) {

		var newReview = new Review({
			review: review,
			book: book,
			_user: userId
		});

		user.reviews.push(newReview._id);
		console.log(review);
		newReview.save(function (err) {
			user.save(function (err) {
				if(err){ 
					console.log("Couldn't save book review =(");
					cb(err); 
				}
				cb(null, user);
			});
		});
	});
};

reviewSchema.statics.deleteReview = function (id, cb) {
	Review.findOneAndRemove(id, function (err) {
		cb(err);
	});
	
}

reviewSchema.statics.update = function (object, cb) {
	console.log(object);
	Review.findByIdAndUpdate(object.reviewId, {$set: object}, {new: true}, function (err, updatedObj) {
		if(err){
			cb(err);
		}
		console.log(updatedObj);
		cb(null, updatedObj);
	})
}


mongoose.model("Review", reviewSchema);

var Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
