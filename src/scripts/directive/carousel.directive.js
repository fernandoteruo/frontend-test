(function() {
	"use strict";
	angular.module("netflixRouletteApp").directive("movieCarousel", function() {
		return {
			restrict: "A",
			scope: {
				data: "<",
				destroy: "<"
			},
			link: function(scope, elem, attr) {
				scope.$watchGroup(["data", "destroy"], function() {
					if(scope.destroy) {
						elem.owlCarousel("destroy");
					}
					if (scope.data !== undefined && scope.data.length > 0) {
						elem.owlCarousel({
							loop: false,
							margin: 10,
							responsiveClass: true,
							dots: true,
							nav: false,
							responsive: {
								0: {
									items: 1,
								},
								600: {
									items: 2,
								},
								900: {
									items: scope.data.length,
								},
							}
						});
					}
				});
			}
		};
	});
})();