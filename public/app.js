function handleFileSelect(evt) {
    "use strict";
    var files = evt.target.files;

    for (var i = 0, f; f = files[i]; i++) {

        if (!f.type.match('image.*')) {
            continue;
        }

        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function (theFile) {
            
            console.log(theFile);
            
//            document.querySelector("").src = theFile.name;
            
            return function (e) {
                var img = new Image();
                img.src = e.target.result;

                var colorThief = new ColorThief();
                var image = new CanvasImage(img);

                var domColor = colorThief.getColor(img);
                var pallete = colorThief.getPalette(img);

                var get = getHexPallete(domColor, pallete, cssTemplate);
                console.log(get);
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
}

function getHexPallete(domColor, pallete, cssTemplate) {
    "use strict";
    pallete.unshift(domColor);
    var palleteArray = [],
        flexContainer = document.createElement("main");;

    for (var i = 0; i < pallete.length; i++) {

        var firstbit = pallete[i][0].toString(16),
            secbit = pallete[i][1].toString(16),
            thirbit = pallete[i][2].toString(16),
            div = document.createElement("div"),
            hex = `#${firstbit}${secbit}${thirbit}`;

        div.style.width = "50px";
        div.style.height = "50px";
        div.style.backgroundColor = hex;
        div.className = hex;
        document.querySelector("#colorPallete").appendChild(flexContainer);
        flexContainer.appendChild(div);
        palleteArray.push(hex);
    }
    return cssTemplate(palleteArray);
}

function cssTemplate(array) {
    var style = `
html {
	background: -webkit-radial-gradient(ellipse, ${array[1]} 0%, ${array[0]} 100%) fixed;
	background: radial-gradient(ellipse, ${array[1]} 0%, ${array[0]} 100%) fixed;
}

h1 {
	color: ${array[2]};
}

h2,
h4 {
	color: ${array[3]};
}

h3,
h5 {
	color: ${array[4]};
}

a {
	color: #2d5d94;
	border-bottom: 2px solid #2d5d94;
}

a:hover {
	color: #7b4c8d;
    border-bottom: 2px solid #7b4c8d;
}

a:visited {
	color: #7b4c8d;
    border-bottom: 2px solid #7b4c8d;
}

#footer {
	color: #e2e2e2;
	background-color: #2d5d94;
}

/********************************************
    SPLASH PAGE STYLING
*********************************************/

.splash #article {
	color: #eaeaea;
	background-color: #125576;
}

.splash h1 {
	color: #fafafa;
}

.splash h2,
.splash h4 {
	color: #a1d7ff;
}

.splash h3,
.splash h5{
	color: #c3c3c3;
}

.splash a {
    color: #a1d7ff;
	border-bottom: 2px solid #a1d7ff;
}

.splash a:hover {
	color: #c08fd3;
    border-bottom: 2px solid #c08fd3;
}

.splash a:visited {
	color: #c08fd3;
    border-bottom: 2px solid #c08fd3;
}

.splash #footer {
	color: #e2e2e2;
	background-color: #133955;
}

/********************************************
    FEATURES STYLING
*********************************************/

/* Callout box */
.callout {
    color: #2d5d94;
    background: #e3ded1;
}

/* Drop downs */
.drop-down {
    background: #6c6c6c;
}

.drop-down:hover {
    background: #7f7f7f;
}

/* Rubric table */
/* Column headings */
.rubric tr:first-child th {
	background-color: #1e435d;
}

/* Row headings */
.rubric th {
    background-color: #2d5d94;
}

/* Mouseover popups */
#main .popup {
    border-bottom: dotted 2px #3084c3;
}

#main .popup span {
    background: #274b66;
}

#main .popup:after {
    border-color: #274b66 transparent transparent transparent;
}
`;

    return style;
}


document.getElementById('files').addEventListener('change', handleFileSelect, false);