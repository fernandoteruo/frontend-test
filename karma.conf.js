//jshint strict: false
module.exports = function(config) {
	var basePath = "./src";
	var node = "node_modules";
	config.set({
		preprocessors: {
			'**/*.html': ['ng-html2js']
		},

		ngHtml2JsPreprocessor: {
			stripPrefix: "/",
			moduleName: "templates"
		},

		files: [
			node + '/bootstrap/dist/css/bootstrap.css',
			node + '/jquery/dist/jquery.js',
			node + '/bootstrap/dist/js/bootstrap.js',
			node + '/angular/angular.js',
			node + '/angular-route/angular-route.js',
			node + '/angular-mocks/angular-mocks.js',
			basePath + '**/*.html',
			basePath + '**/*.module.js',
			'*!(.module|.spec).js',
			'!(node_modules)/**/*!(.module|.spec).js',
			'tests/**/*.spec.js'
		],

		autoWatch: true,

		frameworks: ['jasmine'],

		browsers: ['Chrome', 'Firefox'],

		plugins: [
			'karma-chrome-launcher',
			'karma-firefox-launcher',
			'karma-jasmine',
			'karma-ng-html2js-preprocessor'
		]
	});
};