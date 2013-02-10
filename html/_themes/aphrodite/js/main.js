var Mky = {

	/**
	 * setPreference: sets user preferences to the storage APIs.
	 * @param <String> preference to be set.
	 * @param <String> value to be set.
	 * @param <String> storage type to use, local or session, defaults to session.
	 * @returns <Bolean> whether the preference was able to be set.
	 */
	setPreference: function (preference, value, storageType) {
		
		var that = this;
		
		if (typeof preference !== 'string') {
			throw new Error("Mky.setPreference: expecting param ‘preference’ to be type string.");
		}
		
		if (typeof value !== 'string') {
			throw new Error("Mky.setPreference: expecting param ‘value’ to be type string.");
		}
		
		storageType = storageType || 'session';
		
		switch (storageType) {
			case 'session':
				if (that.supports.sessionStorage()) {
					sessionStorage.setItem(preference, value);
					return true;
				}
				return false;
			case 'local':
				if (that.supports.localStorage()) {
					localStorage.setItem(preference, value);
					return true;
				}
				return false;
		}
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
				if (that.supports.sessionStorage()) {
					value = sessionStorage.getItem(preference);
					if (typeof value !== 'string') {
						return '';
					}
					return value;
				}
				return false;
			case 'local':
				if (that.supports.localStorage()) {
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
			vpEl = document.getElementById('vp');
		
		value = value || 'width=980';
		
		if (vpEl)
		{
			vpEl.setAttribute('content', value);
		}
		
		// Save preference for duration of session.
		that.setPreference('viewport', value, 'session');
	},
	
	/**
	 * fetchContent: 
	 * @param <String> anchor that initiated event.
	 */
	fetchContent: function () {
		
		
		
	},
	
	dom: {
		
		addClass: function () {
			
		},
		
		removeClass: function () {
			
		},
		
		toggleClass: function () {
			
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
	
	supports: {
		
		touchEvents: function () {
			return !!('ontouchstart' in window);
		},
		
		/**
		 * history: test browser support for feature.
		 * @returns <Bolean> whether browser supports the History API.
		 */
		history: function () {
			return !!(window.history && 'pushState' in window.history && 'replaceState' in window.history && 'PopStateEvent' in window);
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
		}
		
	}

};

function forceDesktop(event) {
	event.preventDefault();
	
	Mky.viewportSwitch();
}

function clearDesktop(event) {
	event.preventDefault();
	
	Mky.viewportSwitch('width=device-width,initial-scale=1');
}

(function init() {
	
	var checkViewport,
		setupEvents;
	
	checkViewport = function () {
	
		if (Mky.supports.sessionStorage()) {
			var viewport = Mky.getPreference('viewport');
			
			if (typeof viewport === 'string') {
				Mky.viewportSwitch();
			}
		}
	};
	
	setupEvents = function () {
		
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
	};
	
	checkViewport();
	setupEvents();
	
}());