angular.module("netflixRouletteApp").component("movieDetail", {
	templateUrl: "movie.detail.component.html",
	bindings: {
		title: "@",
		summary: "@",
		director: "@",
		year: "@",
		runtime: "@",
		category: "@",
		cast: "@",
		poster: "@",
		id: "@"
	},
	controller: ["SessionStorageFactory", "$location", function(SessionStorageFactory, $location) {
		var ctrl = this;
		var session = SessionStorageFactory;

		ctrl.$onInit = function() {
			ctrl.color = "#fff";
			ctrl.showAddToFavorites = $location.url().includes("favorites") ? false : true;
		};
		ctrl.addToFavorites = function() {
			var movie = {
				show_title: ctrl.title,
				summary: ctrl.summary,
				director: ctrl.director,
				release_year: ctrl.year,
				runtime: ctrl.runtime,
				category: ctrl.category,
				show_cast: ctrl.cast,
				poster: ctrl.poster,
				show_id: ctrl.id
			};
			session.add("favorites", movie);
			ctrl.color = "#ff0000";
		};	
	}]
});