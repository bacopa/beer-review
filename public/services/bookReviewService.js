var app = angular.module("bookReviewApp");

app.service("bookReviewService", function ($http) {


	this.getAllBookReviews = function (cb) {
		$http.get("/reviews").success(function (data) {
			cb(data);
		});
	}

})