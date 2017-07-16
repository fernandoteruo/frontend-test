(function() {
	"use strict";

	var gulp = require("gulp");
	var sass = require("gulp-sass");
	var rename = require("gulp-rename");
	var del = require("del");
	var minimist = require("minimist");
	var shell = require("gulp-shell");
	var flatten = require("gulp-flatten");
	var jsMin = require("gulp-uglify");
	var htmlMin = require("gulp-htmlmin");
	var util = require("gulp-util");
	var merge = require("merge-stream");
	var replace = require("gulp-replace");
	var concat = require("gulp-concat");
	var sourcemaps = require("gulp-sourcemaps");

	var srcRoot = "src/";
	var knownOptions = {
		string: ["env"],
		"default": {
			env: "dev"
		}
	};
	var options = minimist(process.argv.slice(2), knownOptions);
	var dstPath = "build/" + options.env + "/";

	function clean() {
		return del([dstPath + "**/*.*"]);
	}
	var renameOptions = {
		dirname: "",
		suffix: ".min"
	};

	function sassCompileMinify() {
		var sassOptions = {
			outputStyle: "compressed",
			precision: 8
		};
		return gulp.src([srcRoot + "sass/**/*.scss"]).pipe(sass(sassOptions).on("error", sass.logError)).pipe(flatten()).pipe(rename(renameOptions)).pipe(gulp.dest(dstPath));
	}

	function jsMinify() {
		return gulp.src([
			srcRoot + "scripts/app.module.js",
			srcRoot + "scripts/**/*.routes.js",
			srcRoot + "scripts/**/*.component.js",
			srcRoot + "scripts/**/*.directive.js",
			srcRoot + "scripts/**/*.factory.js",
			srcRoot + "scripts/**/*.controller.js"
			]).pipe(sourcemaps.init()).pipe(concat("app.js")).pipe(jsMin()).pipe(rename(renameOptions)).pipe(sourcemaps.write(".")).pipe(flatten()).pipe(gulp.dest(dstPath));
	}

	function htmlMinify() {
		return gulp.src([srcRoot + "templates/**/*.html"]).pipe(htmlMin({
			collapseWhitespace: true,
			removeComments: true
		})).pipe(flatten()).pipe(gulp.dest(dstPath));
	}

	function images() {
		return gulp.src([srcRoot + "img/**/*.png", 
			srcRoot + "img/**/*.jpg",
			srcRoot + "img/**/*.jpeg"]).pipe(flatten()).pipe(gulp.dest(dstPath));
	}

	function configFiles() {
		var config = gulp.src(["config/" + options.env + "/**/*.js"]).pipe(jsMin()).pipe(rename(renameOptions)).pipe(flatten()).pipe(gulp.dest(dstPath));
		
		if (options.env === "tst") {
			var data = gulp.src(["data/**/*"]).pipe(flatten()).pipe(gulp.dest(dstPath));
			return merge(config, data);
		}
		return config;
	}

	function watchHtml() {
		var watcher = gulp.watch([srcRoot + "templates/**/*.html"]);
		watcher.on("all", function(event, path, stats) {
			util.log("Watching changes - File: " + path + " | Event: " + event);
			htmlMinify();
		});
	}

	function watchJs() {
		var watcher = gulp.watch([srcRoot + "scripts/**/*.js"]);
		watcher.on("all", function(event, path, stats) {
			util.log("Watching changes - File: " + path + " | Event: " + event);
			jsMinify();
		});
	}

	function watchSass() {
		var watcher = gulp.watch([srcRoot + "sass/**/*.scss"]);
		watcher.on("all", function(event, path, stats) {
			util.log("Watching changes - File: " + path + " | Event: " + event);
			sassCompileMinify();
		});
	}

	function handleDependencies() {
		var basePath = "node_modules/";
		var js = gulp.src([
			basePath + "angular/angular.min.js",
			basePath + "angular/angular.min.js.map",
			basePath + "angular-route/angular-route.min.js",
			basePath + "angular-route/angular-route.min.js.map",
			basePath + "jquery/dist/**/jquery.min.js",
			basePath + "jquery/dist/**/jquery.min.js.map",
			basePath + "bootstrap/dist/js/bootstrap.min.js"
		]).pipe(flatten()).pipe(gulp.dest(dstPath));
		var css = gulp.src([
			basePath + "bootstrap/dist/css/bootstrap.min.css",
			basePath + "bootstrap/dist/css/bootstrap.min.css.map"
		]).pipe(replace("../fonts/", "")).pipe(gulp.dest(dstPath));
		var fonts = gulp.src([basePath + "bootstrap/dist/fonts/*"]).pipe(flatten()).pipe(gulp.dest(dstPath));

		return merge(css, fonts, js);
	}

	function run() {
		return gulp.src(dstPath).pipe(shell("http-server -p 3000 " + dstPath));
	}
	gulp.task("build", gulp.series(clean, gulp.parallel(handleDependencies, sassCompileMinify, jsMinify, htmlMinify, configFiles, images)));
	gulp.task("watch", gulp.parallel(watchHtml, watchJs, watchSass));
	gulp.task("start", gulp.series("build", gulp.parallel("watch", run)));
})();