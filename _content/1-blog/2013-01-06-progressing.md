---
title: Progressing
categories:
introduction: I've just passed the one year mark of being in the web industry. Over the past twelve months I've gone from knowing very little, to knowing a little more than very little :) So now seemed like the perfect time to launch my personal site and blog. I enjoy my craft immensely, and so I wanted to take a little time to talk about my tools and process, things I love hearing others talk about.
main_classes: 
---
### CMS

Wordpress is great, but I quickly grow tired o<span class="forty-fifth">f</span> having to undo it's defaults<span class="seventy-fifth">;</span> `<br>` tags, title attributes on everything in sight, empty `<p>` elements and the like are annoyances I could do without. This site instead uses [Statamic](http://statamic.com), a beautiful flat file CMS that I can't recommend enough. The only real limitation of this approach that I've found so far is the lack of a native search functionality. I'm loath to farm out the search experience to a company that will wrap it in ads; thus, I'm hoping for a search add-on in Statamic's soon-to-launch add-on marketplace. Otherwise, Statamic is simply a dream to use. I'm sure I'll write more about it in the future.

### SASS

[LESS](http://lesscss.org) was my first preprocessor and I still think it's a great choice for some, it's significantly lower learning curve and syntax, which stays relatively faithful to the conventions of regular CSS, make it well suited to teams with designers that code. That said, there are things that LESS can't do, and I often find myself jumping through hoops to do things in it. [SASS](http://sass-lang.com) always seemed to me like the Linux of the preprocessor world, a language crafted by programmers for programmers, with little concern for human readability. However, it is also the only way to achieve my perfect CSS workflow.

### Styling for one, styling for all

My role is to put the users’ needs above my own. As such, I've never been a fan of excluding any user unless I absolutely have to; that includes users of legacy browsers like Internet Explorer. Thus, reaching the holy grail of progressive enhancement, creating an experience that's as beautiful and intuitive as possible in every browser, has been something of an obsession of mine. By switching to SASS, I think I've gotten pretty close.

This workflow borrows from the fantastic writing of a great many people, especially Aaron Gustafson whose book <cite>[Adaptive Web Design](http://readmill.com/books/adaptive-web-design-crafting-rich-experiences-with-progressive-enhancement)</cite> should have a place in every developer's library. The SASS directory of this site contains eight stylesheets, _typography.scss, _layout.scss, _color.scss, _behaviour.scss, six.scss, seven-eight.scss, nine.scss, and neue.scss; of those, the first four are import-only, and the latter four are compiled into CSS stylesheets to be served to browsers. As you may have guessed, the numbered stylesheets reference the versions of IE to which they are served, with neue.scss being served to IE 10 and all other browsers.

If you think that writing four different stylesheets for different browsers is bat-shit-crazy, I'd agree. The stylesheets that are served to browsers actually contain no styles of their own, they purely import from the other group of stylesheets. Thus, I split my styles up into four sections, typography, layout, color, and behaviour, and then import them into the compiled group. six.scss imports _typography.scss and _color.scss, seven-eight.scss imports those plus _layout.scss, as does nine.scss, and neue.scss additionally imports _behaviour.scss. Write once, run anywhere.

You may have noticed that seven-eight.scss and nine.scss both import the same sections, so why are there two of them? And what about media queries, <IE 9 doesn't support them? That's where SASS comes in, SASS allows if/else statements, LESS does not. Serving media queries to old versions of IE, using [respond.js](https://github.com/scottjehl/Respond) to bring support and serving an interface intended for 200-300 pixel devices without javascript never felt right to me, though I've gone down that route in the past. This time around, I set a `$mediaqueries` variable in each of the directly-compiled SASS stylesheets; then I write media queries like thus:

	@if $mediaqueries {
	  @media only screen and (min-width: 26.25em) { ... }
	}
	@else {
	  // Desktop suitable rule
	}

Thus, six.scss and seven-eight.scss have `$mediaqueries = false;`, but nine.scss and neue.scss have `$mediaqueries = true;`. I find this preferable to splitting media queries into their own stylesheet which only gets imported into nine.scss and neue.scss as I inline media queries allow you to understand their context at a glance; having them in a separate stylesheet abstracts them and requires you to remember their purpose. In some cases I have an `@else { ... }` rule, usually containing the contents of the largest screen-size media query, but in other cases no else statement is necessary.

So with that, I've written my styles once, and have them compiled for browsers of every capability. IE 6 and lower get a typographically-focused stylesheet with most of the branding communicated through color and type, IE 7 and 8 get the same plus a mostly-not-responsive layout, IE 9 instead gets a mobile first, responsive layout, and every other browser gets the addition of _behaviour.scss, which contains CSS transitions and animations. I wasn't necessary to exclude those from older versions of IE, but I was easy enough and results in a slightly smaller file size with fewer redundant rules. Another trick, from the good Aaron Gustafson, is that all layout rules are in a `@media screen { ... }` query, which legacy version of IE do support. This means that all layout is shielded from print, and makes creating inline print styles very easy.