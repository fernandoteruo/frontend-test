(function() {
	"use strict";
	angular.module("netflixRouletteApp").directive("onEnter", function() {
		return {
			restrict: "A",
			link: function(scope, elem, attr) {
				elem.on("keydown keypress", function(event) {
					if (event.which === 13) {
						scope.$apply(function() {
							scope.$eval(attr.onEnter);
						});
						event.preventDefault();
					}
				});
			}
		};
	});
})();