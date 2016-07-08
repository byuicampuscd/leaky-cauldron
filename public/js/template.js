var style = "";

function template() {
    style = `/********************************************************
    The purpose of course.css is to house only the css
    specific to an individual course. The online.css
    houses all the default template formatting.
********************************************************/
/* DO NOT DELETE OR MODIFY THIS IMPORT */
@import url("https://content.byui.edu/integ/gen/599082e0-3e89-4fd9-ac69-2615865d63c7/0/online.css");

/* Adjust/Add Course Specific css Below */
html {
	background: -webkit-radial-gradient(ellipse, ${options.innergrad.color} 0%, ${options.outergrad.color} 100%) fixed;
	background: radial-gradient(ellipse, ${options.innergrad.color} 0%, ${options.outergrad.color} 100%) fixed;
}
h1 {
	color: ${options.h1.color};
}
h2,
h4 {
	color: ${options.h2.color};
}
h3,
h5 {
	color: ${options.h3.color};
}
a {
	color: ${options.a.color};
	border-bottom: 2px solid ${options.a.color};
}
a:hover {
	color: ${options.aHover.color};
    border-bottom: 2px solid ${options.aHover.color};
}
a:visited {
	color: ${options.aHover.color};
    border-bottom: 2px solid ${options.aHover.color};
}
#footer {
	color: ${options.footerColor.color};
	background-color: ${options.footerBackground.color};
}
/********************************************
    SPLASH PAGE STYLING
********************************************/
.splash #article {
	color: ${options.splashColor.color};
	background-color: ${options.splashBackground.color};
}
.splash h1 {
	color: ${options.splashH1.color};
}
.splash h2,
.splash h4 {
	color: ${options.splashH2.color};
}
.splash h3,
.splash h5{
	color: ${options.splashH3.color};
}
.splash a {
    color: ${options.splashA.color};
	border-bottom: 2px solid ${options.splashA.color};
}
.splash a:hover {
	color: ${options.splashAHover.color};
    border-bottom: 2px solid ${options.splashAHover.color};
}
.splash a:visited {
	color: ${options.splashAHover.color};
    border-bottom: 2px solid ${options.splashAHover.color};
}
.splash #footer {
	color: ${options.splashFooterColor.color};
	background-color: ${options.splashFooterBackground.color};
}
/********************************************
    FEATURES STYLING
********************************************/
/* Callout box */
.callout {
    color: ${options.calloutColor.color};
    background: ${options.calloutBackground.color};
}
/* Drop downs */
.drop-down {
    background: ${options.dropdownBackground.color};
}
.drop-down:hover {
    background: ${options.dropdownHover.color};
}
/* Rubric table */
/* Column headings */
.rubric tr:first-child th {
	background-color: ${options.columnHeading.color};
}
/* Row headings */
.rubric th {
    background-color: ${options.rowHeading.color};
}
/* Mouseover popups */
#main .popup {
    border-bottom: dotted 2px ${options.popup.color};
}
#main .popup span {
    background: ${options.popup.color};
}
#main .popup:after {
    border-color: ${options.popup.color} transparent;
}
/* TOA Banners */
h1.prepare,
h2.prepare {
    background: ${options.prepareActivity.color};
}
h1.prepare:before,
h2.prepare:before {
    background: ${options.prepareLabel.color};
}
h1.teach,
h2.teach {
    background: ${options.teachActivity.color};
}
h1.teach:before,
h2.teach:before {
    background: ${options.teachLabel.color};
}
h1.ponder,
h2.ponder {
    background: ${options.ponderActivity.color};
}
h1.ponder:before,
h2.ponder:before {
    background: ${options.ponderLabel.color};
}`;
    return style;
}

function cssTemplate() {
    var loadStyle = template();
    $("#small, #large, #features, #general, #color-wrapper").css("display", "none");
    $("#css-output").css("display", "block");
    document.querySelector("#page-selection input:checked").checked = false;
    document.querySelector("#css-output textarea").innerHTML = loadStyle;
}
