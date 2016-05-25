var app = angular.module("ReviewApp");

app.controller("homeCtrl", function ($scope, userService, reviewService) {

	
	// reviewService.getAllReviews(function (data) {
	// 	$scope.reviews = data;
	// });

	//get a beer
	reviewService.getRandomBeer(function (data) {
		$scope.beer = data;
		console.log("$scope.beer", $scope.beer);
	});

	

});