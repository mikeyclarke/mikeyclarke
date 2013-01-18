// @codekit-prepend "modernizr-build.js";

var siteDomain = document.getElementById('site-domain').content;

Modernizr.load({
  test: Modernizr.fontface,
  yep : '//f.fontdeck.com/s/css/sDLal4th9BQH2lvZFncwJ6sQBs4/' + siteDomain + '/27874.css'
});

// Clean up after Modernizr
try {
	document.getElementsByTagName('html')[0].removeAttribute('style');
}
catch(e) {
	
}