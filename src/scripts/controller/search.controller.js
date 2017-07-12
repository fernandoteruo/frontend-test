(function() {
	"use strict";
	angular.module("netflixRouletteApp").controller("SearchController", ["SearchFactory", function(SearchFactory) {
		var ctrl = this;
		ctrl.$onInit = function() {
			ctrl.actor = "Jet Li";
			ctrl.searchByActor();
		};
		ctrl.searchByTitle = function() {
			SearchFactory.findByTitle(ctrl.title).then(onSuccess, onError);
		};
		ctrl.searchByDirector = function() {
			SearchFactory.findByDirector(ctrl.director).then(onSuccess, onError);
		};
		ctrl.searchByActor = function() {
			SearchFactory.findByActor(ctrl.actor).then(onSuccess, onError);
		};

		var onSuccess = function(response) {
			ctrl.result = [];
			if (response.data.constructor === Object) {
				ctrl.result.push(angular.copy(response.data));
			} else {
				ctrl.result = angular.copy(response.data);
			}
			console.log(ctrl.result);
		};
		var onError = function(err) {
			console.log(err);
		};
	}]);
})();