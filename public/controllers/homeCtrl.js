var app = angular.module("bookReviewApp");

app.controller("homeCtrl", function ($scope, userServices, bookReviewServices) {

	
	bookReviewServices.getAllBookReviews(function (data) {
		$scope.bookReviews = data;
	});


	console.log("homeCtrl");

});