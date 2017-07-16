angular.module("netflixRouletteApp").controller("SearchController", ["SearchFactory", function(SearchFactory) {
	var ctrl = this;
	ctrl.search = function() {
		ctrl.errCount = 0;
		ctrl.result = [];
		SearchFactory.findByTitle(ctrl.searchParam).then(onSuccess, onError);
		SearchFactory.findByDirector(ctrl.searchParam).then(onSuccess, onError);
		SearchFactory.findByActor(ctrl.searchParam).then(onSuccess, onError);
	};

	var onSuccess = function(response) {
		if (response.data.constructor === Object) {
			ctrl.result.push(angular.copy(response.data));
		} else {
			for (var i = 0; i < response.data.length; i++) {
				ctrl.result.push(response.data[i]);
			}
		}
	};
	var onError = function(err) {
		console.log(err);
		ctrl.errCount++;
	};
}]);
