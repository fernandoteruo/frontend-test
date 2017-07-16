(function() {
	'use strict';

	describe('netflixRouletteApp', function() {
		beforeEach(function() {
			browser.get('index.html');
			element(by.id('menu-search')).click();
		});

		afterEach(function() {
			element(by.id('input-search-text')).clear();
		});

		it("should see warning message for empty result", function() {
			element(by.id('input-search-text')).sendKeys("error");
			element(by.id('input-search-button')).click();
			expect(element(by.css('.alert')).isDisplayed()).toBe(true);
		});
		it("should see 1 resul", function() {
			element(by.id('input-search-text')).sendKeys("gladiator");
			element(by.id('input-search-button')).click();
			expect(element(by.css('.alert')).isPresent()).toBe(false);
			expect(element.all(by.css('.thumbnail')).count()).toBe(1);
		});
		it("should see 2 resuls", function() {
			element(by.id('input-search-text')).sendKeys("emma-stone");
			element(by.id('input-search-button')).click();
			expect(element(by.css('.alert')).isPresent()).toBe(false);
			expect(element.all(by.css('.thumbnail')).count()).toBe(2);
		});
		it("should see movie details", function() {
			element(by.id('input-search-text')).sendKeys("emma-stone");
			element(by.id('input-search-button')).click();

			element.all(by.css('.glyphicon-chevron-down')).get(0).click();
			expect(element.all(by.css('.panel')).count()).toBe(1);

			var title = element(by.css('h4')).getText();
			var summary = element(by.css('.detail-summary')).element(by.css('span')).getText();
			var director = element.all(by.css('.detail-info')).get(0).all(by.css('p')).get(0).getText();
			var year =  element.all(by.css('.detail-info')).get(0).all(by.css('p')).get(1).getText();
			var duration = element.all(by.css('.detail-info')).get(1).all(by.css('p')).get(0).getText();
			var category = element.all(by.css('.detail-info')).get(1).all(by.css('p')).get(1).getText();
			var cast = element(by.css('.detail-cast')).element(by.css('small')).getText();

			expect(title).toEqual('The Croods');
			expect(summary).toEqual('When an earthquake obliterates their cave, an unworldly prehistoric family is forced to journey through unfamiliar terrain in search of a new home. But things for pessimistic dad Grug go from bad to worse when his daughter meets a clever cave boy.');
			expect(director).toEqual('Director: Kirk De Micco, Chris Sanders');
			expect(year).toEqual('Year: 2013');
			expect(duration).toEqual('Duration: 98 min');
			expect(category).toEqual('Category: Children & Family Movies');
			expect(cast).toEqual('Cast: Nicolas Cage, Emma Stone, Ryan Reynolds, Catherine Keener, Cloris Leachman, Clark Duke, Chris Sanders, Randy Thom');
		});
		it("should put movie into favorite", function() {
			element(by.id('input-search-text')).sendKeys("peter-jackson");
			element(by.id('input-search-button')).click();

			expect(element.all(by.css('.glyphicon-chevron-down')).count()).toBe(4);
			element.all(by.css('.glyphicon-chevron-down')).get(0).click();
			expect(element.all(by.css('.panel')).count()).toBe(1);
			element(by.css('i')).click();

			element.all(by.css('.glyphicon-chevron-down')).get(1).click();
			expect(element.all(by.css('.panel')).count()).toBe(1);	
			element(by.css('i')).click();
		});
	});
})();