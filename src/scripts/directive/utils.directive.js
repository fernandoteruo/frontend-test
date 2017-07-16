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
}).directive("imgOnError", function() {
	return {
		restrict: "A",
		scope: {
			imgOnError: "<"
		},
		link: function(scope, elem, attr) {
			elem.on("error", function() {
				elem.attr("src", "not-found.png");
				elem.parent().find("figcaption").prepend("<p class='movie-title'>" + scope.imgOnError + "</p>");
			});
		}
	};
});
