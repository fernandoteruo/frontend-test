(function() {
	"use strict";
	angular.module("netflixRouletteApp").factory("SearchFactory", ["$http", "appConfig", function($http, appConfig) {
		var baseUrl = appConfig.basePath;
		
		var execute = function(request) {
			return $http({
				method: "GET",
				url: baseUrl + request
			});
		};
		var findByTitle = function(title) {
			var request = "title=" + encodeURIComponent(title);
			return execute(request);
		};
		var findByDirector = function(director) {
			var request = "director=" + encodeURIComponent(director);
			return execute(request);	
		};
		var findByActor = function(actor) {
			var request = "actor=" + encodeURIComponent(actor);
			return execute(request);
		};
		return {
			findByTitle: findByTitle,
			findByDirector: findByDirector,
			findByActor: findByActor
		};
	}]);
})();