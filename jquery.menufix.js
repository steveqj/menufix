(function($) {

$.fn.menufix = function(options) {

    // Menufix Options

	var settings = $.extend({
	'float' : 'none',
	'fluid' : 'yes',
	'topLimit' : 0
	}, options);

	return this.each(function() {

// Define variables

var nav = $(this);
var navParent = nav.parent();
var navTopMargin = nav.css('marginTop');
var navBotMargin = nav.css('marginBottom');
var navTop = (nav.offset()).top - settings.topLimit;

var navWidth = nav.width();
var navPercent = nav.width() / navParent.width();

nav.wrap('<div id="placeHolder" />');
var navHolder = $('#placeHolder');

// Maintain proportions of menu in responsive designs

var fluidResize = function() {
if ((settings.fluid) == "yes") {

nav.width((navParent.width() * navPercent));

} else {

nav.width(navWidth);

}}

// Make sure menu stays inside placeHolder even if menu is floating 

if (settings.float === 'left' || 'right') {
navHolder.append('<div style=\"clear:both\"></div>');
}

$(window).bind("scroll resize", function() {

var navRight = $(window).width() - navWidth - ((nav.offset()).left);

fluidResize();

var currentScroll = $(window).scrollTop();

// if the page has been scrolled below the top of the navigation

if ((currentScroll > (navTop))) {

navHolder.height(navHolder.height());

if (settings.float === 'none') {
navHolder.css({"margin-top": navTopMargin, "margin-bottom": navBotMargin});
}

if (settings.float === 'right') {
nav.css({"right":navRight});
}

nav.css({"position":"fixed", "top":settings.topLimit, "margin-top":"0px", "z-index":"99999"}).addClass('fixedNav');

} else {

navHolder.css({"margin-top": "0px"});

nav.css({"position": "static", "margin-top": navTopMargin}).removeClass('fixedNav');

}

});

});
 	
};
})(jQuery);