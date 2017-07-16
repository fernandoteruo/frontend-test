(function() {
	'use strict';

	describe('netflixRouletteApp', function() {
		beforeEach(function() {
			browser.get('index.html');
			element(by.id('menu-favorites')).click();
		});

		it("should see 2 favorited movies and check their names", function() {
			expect(element.all(by.css('.thumbnail')).count()).toBe(2);

			element.all(by.css('.glyphicon-chevron-down')).get(0).click();
			expect(element.all(by.css('.panel')).count()).toBe(1);
			expect(element(by.css('h4')).getText()).toEqual('Heavenly Creatures');

			element.all(by.css('.glyphicon-chevron-down')).get(1).click();
			expect(element.all(by.css('.panel')).count()).toBe(1);
			expect(element(by.css('h4')).getText()).toEqual('The Frighteners');
		});
	});
})();