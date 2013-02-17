

var Mky = {

	/**
	 * setPreference: sets user preferences to the storage APIs.
	 * @param <String> preference to be set.
	 * @param <String> value to be set.
	 * @param <String> storage type to use, local or session, defaults to session.
	 * @returns <Bolean> whether the preference was able to be set.
	 */
	setPreference: function (preference, value, duration, fallback) {
		
		var that = this;
		
		if (typeof preference !== 'string') {
			throw new Error("Mky.setPreference: expecting param ‘preference’ to be type string.");
		}
		
		if (typeof value !== 'string') {
			throw new Error("Mky.setPreference: expecting param ‘value’ to be type string.");
		}
		
		duration = duration || 'session';
		
		switch (duration) {
			case 'session':
				if (that.supports.sessionStorage) {
					sessionStorage.setItem(preference, value);
					return true;
				}
				if (that.supports.cookies && fallback !== false) {
					that.setCookie(preference, value);
					return true;
				}
				return false;
			case 'local':
				if (that.supports.localStorage) {
					localStorage.setItem(preference, value);
					return true;
				}
				if (that.supports.cookies && fallback !== false) {
					// todo: pass a default expires value for cookie storage.
					that.setCookie(preference, value, "Something");
					return true;
				}
				return false;
		}
		return false;
	},
	
	/**
	 * getPreference: gets user preferences to the storage APIs.
	 * @param <String> preference to get.
	 * @param <String> storage type it’s in, local or session, defaults to session.
	 * @returns <Bolean> whether the preference was able to be set.
	 */
	getPreference: function (preference, storageType) {
		
		var that = this,
			value;
		
		if (typeof preference !== 'string') {
			throw new Error("Mky.getPreference: expecting param ‘preference’ to be type string.");
		}
		
		storageType = storageType || 'session';
		
		switch (storageType) {
			case 'session':
				if (that.supports.sessionStorage) {
					value = sessionStorage.getItem(preference);
					if (typeof value !== 'string') {
						return '';
					}
					return value;
				}
				return false;
			case 'local':
				if (that.supports.localStorage) {
					value = localStorage.getItem(preference);
					if (typeof value !== 'string') {
						return '';
					}
					return value;
				}
				return false;
		}
	},
	
	/**
	 * viewportSwitch: changes the viewport <meta> to allow access to a different experience.
	 * @param <String> value for the viewport meta, defaults to ‘width=980’.
	 */
	viewportSwitch: function (value) {
		
		var that = this,
			vpEl = document.getElementById('vp'),
			pref;
		
		value = value || 'width=980';
		
		if (vpEl)
		{
			vpEl.setAttribute('content', value);
		}
		
		// Save preference for duration of session.
		pref = that.setPreference('viewport', value, 'session');
	},
	
	/**
	 * fetchContent: 
	 * @param <String> anchor that initiated event.
	 */
	fetchContent: function () {
		
		
		
	},
	
	setCookie: function (name, value, duration) {
		
		if (typeof name !== 'string') {
			throw new Error("Mky.setCookie: expecting param ‘name’ to be type string.");
		}
		
		if (typeof value !== 'string') {
			throw new Error("Mky.setCookie: expecting param ‘value’ to be type string.");
		}
	
		if (duration && duration !== 'session') {
			duration = '; expires=' + duration;
		}
		else {
			duration = '';
		}
		
		document.cookie = name + '=' + value + duration;
	},
	
	dom: {
		
		addClass: function (element, classNom) {
			
			var currentClasses;
			
			if (typeof element !== 'object' && typeof element !== 'string') {
				throw new Error("Mky.dom.addClass: expecting param ‘element’ to be type object or string.");
			}
			
			if (typeof classNom !== 'string') {
				throw new Error("Mky.dom.addClass: expecting param ‘classNom’ to be type string.");
			}
			
			if (typeof element !== 'object') {
				element = document.getElementById(element);
			}
			
			if (element.classList) {
				element.classList.add(classNom);
				return;
			}
			
			currentClasses = element.className;
			
			if (currentClasses === '') {
				element.className = classNom;
			}
			
			if (currentClasses.indexOf(classNom) !== -1) {
				return;
			}
			
			element.className += classNom;
		},
		
		removeClass: function (element, classNom) {
			
			var currentClasses,
				i;
			
			if (typeof element !== 'object' && typeof element !== 'string') {
				throw new Error("Mky.dom.removeClass: expecting param ‘element’ to be type object or string.");
			}
			
			if (typeof classNom !== 'string') {
				throw new Error("Mky.dom.removeClass: expecting param ‘classNom’ to be type string.");
			}
			
			if (typeof element !== 'object') {
				element = document.getElementById(element);
			}
			
			if (element.classList) {
				if (element.classList.contains(classNom)) {
					element.classList.remove(classNom);
					
					if (element.classList.length === 0 && element.hasAttribute('class')) {
						element.removeAttribute('class');
					}
				}
				return;
			}

			currentClasses = element.className;
			
			if (currentClasses === '') {
				return;
			}
			
			currentClasses = currentClasses.split(' ');
			
			for (i = 0; i < currentClasses.length; i += i) {
				if (currentClasses[i] === classNom) {
					currentClasses.splice(i, 1);
					break;
				}
			}
			
			if (currentClasses.length === 0) {
				element.removeAttribute('class');
			}
			else {
				console.log(currentClasses.join(' '));
				element.className = currentClasses.join(' ');
			}
		},
		
		toggleClass: function (element, classNom) {
			
			var that = this,
				currentClasses;
			
			if (typeof element !== 'object' && typeof element !== 'string') {
				throw new Error("Mky.dom.toggleClass: expecting param ‘element’ to be type object or string.");
			}
			
			if (typeof classNom !== 'string') {
				throw new Error("Mky.dom.toggleClass: expecting param ‘classNom’ to be type string.");
			}
			
			if (typeof element !== 'object') {
				element = document.getElementById(element);
			}
			
			if (element.classList) {
				if (element.classList.contains(classNom)) {
					that.removeClass(classNom);
				}
				else {
					that.addClass(classNom);
				}
			}
		},
		
		hasClass: function (element, classNom) {
			
			var currentClasses,
				i;
			
			if (typeof element !== 'object' && typeof element !== 'string') {
				throw new Error("Mky.dom.hasClass: expecting param ‘element’ to be type object or string.");
			}
			
			if (typeof classNom !== 'string') {
				throw new Error("Mky.dom.hasClass: expecting param ‘classNom’ to be type string.");
			}
			
			if (typeof element !== 'object') {
				element = document.getElementById(element);
			}
			
			if (element.classList) {
				return element.classList.contains(classNom);
			}
			
			currentClasses = element.className;
			
			if (currentClasses === '') {
				return false;
			}
			
			currentClasses = currentClasses.split(' ');
			
			for (i = 0; i < currentClasses.length; i += i) {
				if (currentClasses[i] === classNom) {
					return true;
				}
			}
		}
	},
	
	events: {
	
		addListener: function (element, event, listener) {
			
			if (typeof element !== 'object') {
				throw new Error("Mky.event.addListener: expecting param ‘element’ to be type object.");
			}
			
			if (typeof event !== 'string') {
				throw new Error("Mky.event.addListener: expecting param ‘event’ to be type string.");
			}
			
			if (typeof listener !== 'function') {
				throw new Error("Mky.event.addListener: expecting param ‘listener’ to be type function.");
			}
			
			event = [event, 'on' + event];
			
			if (element.addEventListener && window.addEventListener) {
				element.addEventListener(event[0], listener, false);
				return;
			}
			
			if (element.attachEvent && window.attachEvent) {
				element.attachEvent(event[1], listener);
				return;
			}
			
			if (element.event[1]) {
				element.event[1] = listener;
			}
		},
		
		removeListener: function (element, event, listener) {
			
			if (typeof element !== 'object') {
				throw new Error("Mky.event.removeListener: expecting param ‘element’ to be type object.");
			}
			
			if (typeof event !== 'string') {
				throw new Error("Mky.event.removeListener: expecting param ‘event’ to be type string.");
			}
			
			if (typeof listener !== 'function') {
				throw new Error("Mky.event.removeListener: expecting param ‘listener’ to be type function.");
			}
			
			event = [event, 'on' + event];
			
			if (element.removeEventListener && window.removeEventListener) {
				element.removeEventListener(event[0], listener, false);
				return;
			}
			
			if (element.detachEvent && window.detachEvent) {
				element.detachEvent(event[1], listener);
				return;
			}
			
			if (element.event[1]) {
				element.event[1] = null;
			}
			
		}
	
	},
	
	supports: {},
	
	test: {
		
		cookies: function () {
			return 'cookie' in document;
		},
		
		/**
		 * history: test browser support for feature.
		 * @returns <Bolean> whether browser supports the History API.
		 */
		history: function () {
			return !!(window.history && window.history.pushState && window.history.replaceState && 'PopStateEvent' in window);
		},
		
		/**
		 * localStorage: test browser support for feature.
		 * @returns <Bolean> whether browser supports the localStorage API.
		 */
		localStorage: function () {
			
			var ls = 'localStorage';
			
			try {
				localStorage.setItem('supports', ls);
				if (localStorage.getItem('supports') !== ls) {
					return false;
				}
				localStorage.removeItem('supports');
				return true;
			}
			catch (err) {
				return false;
			}
		},
		
		/**
		 * sessionStorage: test browser support for feature.
		 * @returns <Bolean> whether browser supports the sessionStorage API.
		 */
		sessionStorage: function () {
			
			var ss = 'sessionStorage';
			
			try {
				sessionStorage.setItem('supports', ss);
				if (sessionStorage.getItem('supports') !== ss) {
					return false;
				}
				sessionStorage.removeItem('supports');
				return true;
			}
			catch (err) {
				return false;
			}
		},
		
		touchEvents: function () {
			return !!('ontouchstart' in window);
		}
	},
	
	load: function () {
		var that = this,
			test = that.test;
		
		for (feature in test) {
			that.supports[feature] = test[feature]();
		}
	}

};

Mky.load();

function forceDesktop(event) {
	event.preventDefault();
	
	Mky.viewportSwitch();
}

function clearDesktop(event) {
	event.preventDefault();
	
	Mky.viewportSwitch('width=device-width,initial-scale=1');
}

(function checkViewport() {
	
	if (Mky.supports.sessionStorage) {
		var viewport = Mky.getPreference('viewport');
		
		if (typeof viewport === 'string' && viewport !== '') {
			Mky.viewportSwitch();
		}
	}
}());

(function setUpEvents() {
	
	var vpEls = document.querySelectorAll('.viewport-switch');
	
	for (i = 0; i < vpEls.length; i += 1)
	{
		if (vpEls[i].getAttribute('href').indexOf('vp=desktop') !== -1) {
			Mky.events.addListener(vpEls[i], 'click', forceDesktop);
		}
		else if (vpEls[i].getAttribute('href').indexOf('vp=initial') !== -1) {
			Mky.events.addListener(vpEls[i], 'click', clearDesktop);
		}
	}
}());

// @codekit-append "preferences.js";
// @codekit-append "pushstate.js";