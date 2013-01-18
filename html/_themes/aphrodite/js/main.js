var switchEls = document.querySelectorAll('.desktop-switch');

for (i = 0; i < switchEls.length; i += 1) {
	switchEls[i].addEventListener('click', viewportSwitch);
}

function viewportSwitch(anchor) {
	anchor.event.preventDefault();
	
	document.getElementById('vp').setAttribute('content', 'width=980');
}