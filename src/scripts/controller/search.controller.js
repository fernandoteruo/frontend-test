(function() {
	"use strict";
	angular.module("netflixRouletteApp").controller("SearchController", ["SearchFactory", function(SearchFactory) {
		var ctrl = this;
		ctrl.$onInit = function() {
			ctrl.showDetails = false;
			ctrl.destroyCarousel = false;
			ctrl.searchParam = "emma-stone";
			ctrl.search();
		};
		ctrl.search = function() {
			ctrl.destroyCarousel = true;
			ctrl.errCount = 0;
			ctrl.result = [];
			SearchFactory.findByTitle(ctrl.searchParam).then(onSuccess, onError);
			SearchFactory.findByDirector(ctrl.searchParam).then(onSuccess, onError);
			SearchFactory.findByActor(ctrl.searchParam).then(onSuccess, onError);
		};
		ctrl.showMore = function(index) {
			console.log(index);
			ctrl.showDetails = true;
			ctrl.detail = ctrl.result[index];
		};
		var onSuccess = function(response) {
			if (response.data.constructor === Object) {
				ctrl.result.push(angular.copy(response.data));
			} else {
				ctrl.result = angular.copy(response.data);
			}
			console.log(ctrl.result);
		};
		var onError = function(err) {
			console.log(err);
			ctrl.errCount++;
		};

	}]);
})();