angular.module("netflixRouletteApp").controller("FavoritesController", ["SessionStorageFactory", function(SessionStorageFactory) {
	var ctrl = this;
	var session = SessionStorageFactory;
	ctrl.$onInit = function() {
		ctrl.movies = session.get("favorites");
		ctrl.noFavorites = false;
		if (ctrl.movies === null || ctrl.movies === undefined || ctrl.movies.length === 0) {
			ctrl.noFavorites = true;
		}
	};
}]);
