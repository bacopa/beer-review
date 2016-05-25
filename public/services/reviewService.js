var app = angular.module("ReviewApp");

app.service("reviewService", function ($http) {


	this.getAllReviews = function (cb) {
		$http.get("/reviews").success(function (data) {
			cb(data);
		});
	}

})