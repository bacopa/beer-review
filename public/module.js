var app = angular.module("ReviewApp", ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {

	$stateProvider
	.state("home", {
		url: "/",
		templateUrl: "/partials/home.html",
		controller: "homeCtrl"
	})
	.state("detail", {
		url: "/review/:reviewId",
		templateUrl: "/partials/detail.html",
		controller: "detailCtrl"
	})
	.state("register", {
		url: "/register",
		templateUrl: "/partials/register.html",
		controller: "registerCtrl"
	})
	.state("login", {
		url: "/login",
		templateUrl: "/partials/login.html",
		controller: "userCtrl"
	})
	$urlRouterProvider.otherwise("/");


});