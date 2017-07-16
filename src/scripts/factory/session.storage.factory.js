angular.module("netflixRouletteApp").factory("SessionStorageFactory", [function() {
	var setToSession = function(key, value) {
		if (value !== null && value !== undefined) {
			sessionStorage[key] = JSON.stringify(value);
		}
	};
	var addToSession = function(key, value) {
		var toAdd = [];
		var shouldAdd = true;
		if (!isEmpty(key)) {
			toAdd = getFromSession(key);
			for (var i = 0; i < toAdd.length; i++) {
				if (toAdd[i].show_id === value.show_id) {
					shouldAdd = false;
				}
			}
		}
		if (shouldAdd) {
			toAdd.push(value);
			setToSession(key, toAdd);
		}
	};
	var getFromSession = function(key) {
		var ss = sessionStorage[key];
		if (ss !== null && ss !== undefined && ss.length > 0) {
			return JSON.parse(ss);
		}
		return null;
	};
	var isEmpty = function(key) {
		var ss = getFromSession(key);
		if (ss === null || ss === undefined || ss.length === 0) {
			return true;
		}
		return false;
	};

	return {
		get: getFromSession,
		set: setToSession,
		add: addToSession
	};
}]);
