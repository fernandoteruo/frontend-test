(function() {
	"use strict";
	angular.module("netflixRouletteApp").factory("SearchFactory", ["$http", function($http) {
		var baseUrl = "http://netflixroulette.net/api/api.php?";
		
		var execute = function(request) {
			return $http({
				method: "GET",
				url: baseUrl + request
			});
		};
		var findByTitle = function(title) {
			var request = "title=" + encodeURI(title);
			return execute(request);
		};
		var findByDirector = function(director) {
			var request = "director=" + encodeURI(director);
			return execute(request);	
		};
		var findByActor = function(actor) {
			var request = "actor=" + encodeURI(actor);
			return execute(request);
		};
		return {
			findByTitle: findByTitle,
			findByDirector: findByDirector,
			findByActor: findByActor
		};
	}]);
})();