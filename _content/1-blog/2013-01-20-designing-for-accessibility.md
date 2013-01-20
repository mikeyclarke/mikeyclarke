---
title: Designing for accessibility
categories:
introduction: Accessibility is one of the defining attributes of the web, but sometimes it can be a little hard to work out how all of the great techniques for accessibility actually fit into building a site. When you design for accessibility from the start, making a site accessible is easier than you might think.
---
### Focus in reset stylesheets

By default, some reset stylesheets will remove the default outline on focus states. This is *not* good for keyboard users since it leaves them effectively blind as to the current location of focus on the page. [Normalize](http://necolas.github.com/normalize.css/) is my recommended alternative to reset stylesheets and you can use it safe in the knowledge that it doesn’t hinder accessibility. Whatever reset stylesheet you use, be sure to scan it for `outline: none`. That’s not to say that you must use `outline`, the point is to provide a strong and appropriate visual clue that an element is in focus. Borders, text-decoration, and backgrounds are also good ways to achieve this, but before changing styles that are designed to aid accessibility, make sure that you are replacing them with something of equal visibility.

### Frameworks

While I’m tempted to address this by simply saying [just don’t use frameworks at all](http://12devsofxmas.co.uk/post/2013-01-01-day-7-grid-frameworks), I’ll grant that [some](http://foundation.zurb.com) are marginally better than [others](http://twitter.github.com/bootstrap/), and they have significant use amongst startups and large organisations. If you absolutely **must** use a framework of some kind, please at least be aware of it’s particularly egregious offences, and come up with your own alternatives. For instance, `<a class="btn" href="#"><i class="icon-align-left"></i></a>` is meaningless to someone using your website with a screen reader; instead using `<a class="btn" href="#"><i class="icon-align-left"><span class="visuallyhidden">Align left</span></i></a>` along with a [class that visually hides](http://snook.ca/archives/html_and_css/hiding-content-for-accessibility) the contents of the `<span>` but keeps it accessible by screen readers can make this otherwise meaningless code somewhat more accessible, even if it does remain ugly and inelegant.

### Typography

Typography is the foundation of any website, and it’s fairly easy to make it accessible. Start off by choosing a legible, pleasant typeface. I’m using [FS Me](http://fontdeck.com/typeface/fsmeweb) for my body type, a typeface that I choose for it’s beauty, friendliness and readability, but which also happens to have been developed in association with the Mencap charity to aid reading for those with learning disabilities. All users benefit from a legible font, so hopefully you’ll have already chosen one with that in mind.

The optimum line length for readability is 45-75 characters per line, but some users prefer larger or smaller text than others. By using `em` units for typography rather than pixels, desktop browsers will allow users to change the font size of a website. Using them for everything else allows everything to scale along with the text, so your buttons and other components will keep their proportions when the user changes the font size.

If you’re building a responsive site, consider how the font size holds up at different size screens and consider upping it with media queries where necessary. If you're using ems, this can be as easy as changing the font-size on the `body` element, as everything will scale in proportion to this. For example,

	body {
		font-size: 1em;
	}
	@media only screen and (min-width: 36.875em)  {
		body {
  			font-size: 1.15em;
		}
	}
	@media only screen and (min-width: 40.625em) {
		body {
			font-size: 1.35em;
		}
	}
	@media only screen and (min-width: 50.625em) {
		body {
			font-size: 1.5em;
		}
	}

### Landmark roles

The newest tool to aid accessibility is called ARIA, that’s the Accessibly Rich Internet Applications specification. ARIA sounds pretty complicated and technical, and it’s true that it’s designed with advanced use in web apps in mind. However, it also offers a very simple tool for use on ordinary websites: roles. ARIA roles allow us to specify the purpose or nature of an HTML element.

The roles you’re most likely to use are:
<dl>
<dt><code>article</code></dt><dd>A section of content that forms an independent part of the page that would still make sense when removed from the context of the rest of the page. I use this to markup the div containing blog posts. This is a different type of role to the others listed here, it is not navigable by assistive technologies, but may be worth marking up anyway.</dd>
<dt><code>banner</code></dt><dd>The page header, can only be used **once** per page.</dd>
<dt><code>navigation</code></dt><dd>The primary navigation, can only be used **once** per page.</dd>
<dt><code>complimentary</code></dt><dd>Related, but separate content that makes sense on it’s own.</dd>
<dt><code>region</code></dt><dd>A generic section of content to be used when no other role is appropriate. This should be used in conjunction with a `title` attribute if not otherwise labelled by another element.</dd>
<dt><code>main</code></dt><dd>The area of primary content, can only be used **once** per page.</dd>
<dt><code>search</code></dt><dd>An area of the page that facilitates search, such as a search form or a group of controls that allows advanced search.</dd>
<dt><code>contentinfo</code></dt><dd>An area of content that contains information about the page, such as copyright of authorship; typically the page footer. Can only be used **once** per page.</dd>
</dl>

Theoretically, these ARIA roles are implied by the use of certain HTML5 elements, but currently this is not the case in all browsers, so it’s worth including them even if you do use the HTML5 elements. Also, the HTML5 elements, which the exception of the upcoming-but-not-ready-yet `<main>` element, can be used multiple times on a page. As noted above, this is not the case with all ARIA roles.

The ARIA spec has a [full list of roles](http://www.w3.org/WAI/PF/aria/roles#document_structure_roles) and the Mozilla Developer Network has a great [guide to ARIA](https://developer.mozilla.org/en-US/docs/Accessibility/ARIA?redirectlocale=en-US&redirectslug=ARIA). While ARIA roles are great for improving accessibility, do not overuse them. Often the purpose of an element is implicit and will be communicated by screen readers without needing a role, `<input type="checkbox">` does not require a role to explain that it is a checkbox, for example. Accessibility is atained by correctly using semantic markup, and supplementing it with ARIA only when relevant.

### Semantic HTML

This one is super simple: use the correct element for the content, and keep the presentation in the CSS. Using lean, semantic code has many other benefits besides accessibility, of course. If an image is purely presentational, it really should be applied as a background in the CSS rather than as an inline `<img>`. When using inline images, make sure to include relevant `alt` text unless the meaning is conveyed by the surrounding elements; this text should describe what is contained in the image as if there was no image. See the spec itself for the best [guidelines for alternative text](http://www.w3.org/TR/html5-author/the-img-element.html#alt).

### Skip links

Skip links are links to important parts of the current page. Rather than navigating all the way through the page to find the main content, often users would like to simply skip straight to it. As with any group, users with disabilities have differing opinions; a large percentage of those who use assistive technologies do not frequently use skip links, but another large percentage do. Including skip links is easy, just attach an `id` to the element containing the main content, then add a link at the top of the page with an `href` containing that same `id`. You can then use the previously mentioned [class to visually hide](http://snook.ca/archives/html_and_css/hiding-content-for-accessibility) the link.

	<a href="main-content" class="visuallyhidden">Skip to main content</a>
	<header role="navigation">...</header>
	<nav role="navigation">...</nav>
	<div id="main-content" role="main">...</div>
	<footer role="contentinfo">...</footer>

### Little steps, big difference

Ultimately, improving the accessibility of your projects is not hard, it requires a few little steps and a bit more attention to detail here and there. The benefits from that little extra work to users of assistive technologies are considerable. Clients expect it, laws require it, and, most importantly, it’s **the right thing to do**.