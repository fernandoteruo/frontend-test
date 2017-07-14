(function() {
	"use strict";
	angular.module("netflixRouletteApp").directive("searchDetail", ["$compile", function($compile) {
		return {
			restrict: "A",
			scope: {
				show: "<",
				index: "<",
				searchDetail: "<"
			},
			link: function(scope, elem, attr) {
				var lastIndex;
				scope.$watchGroup(["show", "index"], function() {
					if (lastIndex != scope.index) {
						destroy();
						create();
					} else {
						if(scope.show) {
							create();
						} else {
							destroy();
						}
					}

					function destroy() {
						elem.find("search-detail").remove();
					}
					function create() {
						lastIndex = scope.index;
						console.log(scope.searchDetail);
						var title = scope.searchDetail.show_title;
						var summary = scope.searchDetail.summary;
						var director = scope.searchDetail.director;
						var year = scope.searchDetail.release_year;
						var time = scope.searchDetail.runtime;
						var category = scope.searchDetail.category;
						var cast = scope.searchDetail.show_cast;
						var el = angular.element("<search-detail title='" + title + "' summary='" + summary + "' director='" + director + "' year='" + year + "' runtime='" + time + "' category='" + category + "' cast='" + cast + "'></search-detail>");
						$compile(el)(scope);
						angular.element(elem.find("div")[scope.index]).append(el);
					}
				});


			}
		};
	}]);
})();