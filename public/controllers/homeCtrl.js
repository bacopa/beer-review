var app = angular.module("ReviewApp");

app.controller("homeCtrl", function ($scope, userService, reviewService) {

	
	reviewService.getAllReviews(function (data) {
		$scope.reviews = data;
	});


	

});