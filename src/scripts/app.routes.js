(function() {
	"use strict";
	angular.module("netflixRouletteApp").config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
		$locationProvider.hashPrefix("");
		$routeProvider.
		when("/", {
			templateUrl: "main.html"
		}).
		when("/search", {
			templateUrl: "search-main.html",
		}).
		when("/favorites", {
			templateUrl: "favorites-main.html"
		});
	}]);
})();