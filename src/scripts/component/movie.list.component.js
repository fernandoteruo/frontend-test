angular.module("netflixRouletteApp").component("movieList", {
	templateUrl: "movie.list.component.html",
	bindings: {
		movies: "<"
	},
	controller: ["SessionStorageFactory", function(SessionStorageFactory) {
		var ctrl = this;
		ctrl.$onInit = function() {
			ctrl.show = false;
			ctrl.lastIndex = -1;
		};

		ctrl.showMore = function(index) {
			ctrl.detail = ctrl.movies[index];
			ctrl.index = index;
			ctrl.show = !ctrl.show;
		};
	}]
});