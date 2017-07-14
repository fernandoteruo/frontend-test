(function() {
	"use strict";
	angular.module("netflixRouletteApp").component("searchDetail", {
		templateUrl: "search-detail.html",
		bindings: {
			title: "@",
			summary: "@",
			director: "@",
			year: "@",
			runtime: "@",
			category: "@",
			cast: "@"
		},
		controller: function() {
			var ctrl = this;
			ctrl.addToFavorites = function() {
				var movie = {
					title: ctrl.title,
					summary: ctrl.summary,
					director: ctrl.director,
					year: ctrl.year,
					runtime: ctrl.runtime,
					category: ctrl.category,
					cast: ctrl.case
				};

				
			};
		}
	});
})();