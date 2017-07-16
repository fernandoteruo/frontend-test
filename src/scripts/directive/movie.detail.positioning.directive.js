angular.module("netflixRouletteApp").directive("movieDetail", ["$compile", "$window", function($compile, $window) {
	return {
		restrict: "A",
		scope: {
			show: "<",
			index: "<",
			movieDetail: "<",
			movies: "<"
		},
		link: function(scope, elem, attr) {
			var lastIndex;
			scope.$watchGroup(["show", "index", "movieDetail"], function() {
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
					elem.find("movie-detail").remove();
				}
				function create() {
					lastIndex = scope.index;
					var show_title = scope.movieDetail.show_title;
					var summary = scope.movieDetail.summary;
					var director = scope.movieDetail.director;
					var release_year = scope.movieDetail.release_year;
					var time = scope.movieDetail.runtime;
					var category = scope.movieDetail.category;
					var show_cast = scope.movieDetail.show_cast;
					var poster = scope.movieDetail.poster;
					var show_id = scope.movieDetail.show_id;
					var el = angular.element("<movie-detail title='" + show_title + "' summary='" + summary + "' director='" + director + "' year='" + release_year + "' runtime='" + time + "' category='" + category + "' cast='" + show_cast + "' poster='" + poster + "' id='" + show_id + "'></movie-detail>");
					$compile(el)(scope);
					angular.element(elem.find("div")[adjustPosition(scope.index)]).append(el);
				}
				function adjustPosition(index) {
					var perLine = 1;
					var width = $window.innerWidth;
					if (width >= 768 && width < 992) {
						perLine = 2;
					} else if (width >= 992 && width < 1200) {
						perLine = 3;
					} else if (width >= 1200) {
						perLine = 4;
					}
					if (perLine === 1) {
						return index;
					}
					var matrix = create2dArray(numLines(scope.movies.length, perLine), perLine);
					matrix = populate2dSequentialArray(matrix, scope.movies.length - 1);
					return findLineLast(matrix, index, scope.movies.length);
				}

				function numLines(total, perLine) {
					return Math.ceil(total/perLine);
				}

				//TODO export method
				function create2dArray(x, y) {
					var matrix = new Array(x);
					for (var i = 0; i < x; i++) {
						matrix[i] = new Array(y);
					}
					return matrix;
				}

				//TODO export method
				function populate2dSequentialArray(matrix, maxValue) {
					var value = 0;
					for (var i = 0; i < matrix.length; i++) {
						for (var j = 0; j < matrix[i].length; j++) {
							matrix[i][j] = value;
							value = value < maxValue && value !== -1 ? value+=1 : -1;
						}
					}
					return matrix;
				}

				//TODO export method
				function findLineLast(matrix, value, total) {
					for (var i = 0; i < matrix.length; i++) {
						for (var j = 0; j < matrix[i].length; j++) {
							if(matrix[i][j] === value) {
								if (i !== matrix.length - 1) { //não é ultima linha
									return matrix[i][matrix[i].length - 1];
								}
								return total - 1;
							}
						}
					}
				}
			});
			
		}
	};
}]);
