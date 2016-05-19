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

            var filename = theFile.name.replace(/\.[^/.]+$/, "");

            return function (e) {
                var img = new Image();
                img.src = e.target.result;

                var colorThief = new ColorThief();
                var image = new CanvasImage(img, filename);

                var domColor = colorThief.getColor(img);
                var pallete = colorThief.getPalette(img);

                var get = getHexPallete(domColor, pallete);

            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
    var textarea = document.createElement("textarea");
    textarea.id = "cssOutput";
    document.querySelector('output').appendChild(textarea);
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

        div.style.width = "100px";
        div.style.height = "50px";
        div.style.backgroundColor = hex;
        div.id = hex;
        document.querySelector("#colorPallete").appendChild(flexContainer);
        flexContainer.appendChild(div);
        palleteArray.push(hex);
    }
}

function saveTextAsFile(text) {
    var textToWrite = text;
    var textFileAsBlob = new Blob([textToWrite], {
        type: 'text/plain'
    });
    var fileNameToSaveAs = 'course';

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.URL !== null) {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    } else {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }
    downloadLink.click();
}

function cssTemplate(array) {
    console.log(array);
    var style = `
html {
	background: -webkit-radial-gradient(ellipse, ${array[1].value} 0%, ${array[0].value} 100%) fixed;
	background: radial-gradient(ellipse, ${array[1].value} 0%, ${array[0].value} 100%) fixed;
}

h1 {
	color: ${array[2].value};
}

h2,
h4 {
	color: ${array[3].value};
}

h3,
h5 {
	color: ${array[4].value};
}

a {
	color: ${array[5].value};
	border-bottom: 2px solid ${array[5].value};
}

a:hover {
	color: ${array[6].value};
    border-bottom: 2px solid ${array[6].value};
}

a:visited {
	color: ${array[6].value};
    border-bottom: 2px solid ${array[6].value};
}

#footer {
	color: ${array[8].value};
	background-color: ${array[7].value};
}

/******
    SPLASH PAGE STYLING
*****/

.splash #article {
	color: ${array[9].value};
	background-color: ${array[10].value};
}

.splash h1 {
	color: ${array[11].value};
}

.splash h2,
.splash h4 {
	color: ${array[12].value};
}

.splash h3,
.splash h5{
	color: ${array[13].value};
}

.splash a {
    color: ${array[14].value};
	border-bottom: 2px solid ${array[14].value};
}

.splash a:hover {
	color: ${array[15].value};
    border-bottom: 2px solid ${array[15].value};
}

.splash a:visited {
	color: ${array[15].value};
    border-bottom: 2px solid ${array[15].value};
}

.splash #footer {
	color: ${array[17].value};
	background-color: ${array[16].value};
}

/******
    FEATURES STYLING
*******/

/* Callout box */
.callout {
    color: ${array[19].value};
    background: ${array[18].value};
}

/* Drop downs */
.drop-down {
    background: ${array[20].value};
}

.drop-down:hover {
    background: ${array[21].value};
}

/* Rubric table */
/* Column headings */
.rubric tr:first-child th {
	background-color: ${array[22].value};
}

/* Row headings */
.rubric th {
    background-color: ${array[23].value};
}

/* Mouseover popups */
#main .popup {
    border-bottom: dotted 2px ${array[24].value};
}

#main .popup span {
    background: ${array[24].value};
}

#main .popup:after {
    border-color: ${array[24].value} transparent;
}
`;
    saveTextAsFile(style)
    return style;
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);

var optimize = {
        "general": {
            "background-colors": {
                "outergrad": "",
                "innergrad": ""
            },
            "splash-options": {
                "splash-back": "",
                "splash-text": "",
            },
            "headings": {
                "h1": "",
                "h2": "",
                "h3": ""
            },
            "links": {
                "a": "",
                "link-hover": ""
            },
            "footer": {
                "footer-color": "",
                "footer-text": ""
            }
        },
        "features-options": {

        }
    },
    options = {
        "small-radio": {
            "outergrad": function (h) {
                document.querySelector("html").style.background = `radial-gradient(ellipse, ${h} 0%, ${h} 100%)`;
            },
            "innergrad": function (h) {
                document.querySelector("html").style.background = `radial-gradient(ellipse, ${h} 0%, ${h} 100%)`;
            },
            "h1": function (h) {
                document.querySelector("#small h1").style.color = h;
            },
            "h2": function (h) {
                document.querySelector("#small h2").style.color = h;
                document.querySelector("#small h4").style.color = h;
            },
            "h3": function (h) {
                document.querySelector("#small h3").style.color = h;
                document.querySelector("#small h5").style.color = h;
            },
            "a": function (h) {
                document.querySelector("#small a").style.color = h;
                document.querySelector("#small a").style.borderBottom = `2px solid ${h}`;
            },
            "link-hover": function (h) {
                document.querySelector("#small a:hover").style.color = h;
            },
            "footer-color": function (h) {
                document.querySelector("#small #footer").style.backgroundColor = h;
            },
            "footer-text": function (h) {
                document.querySelector("#small #footer").style.color = h;
            },
        },
        "large-radio": {
            "outergrad": function (h) {
                document.querySelector("html").style.background = `radial-gradient(ellipse, ${array[1].value} 0%, ${array[0].value} 100%)`;
            },
            "innergrad": function (h) {
                document.querySelector("html").style.background = `radial-gradient(ellipse, ${array[1].value} 0%, ${array[0].value} 100%)`;
            },
            "splash-back": function (h) {
                document.querySelector("#large #article").style.backgroundColor = h;
            },
            "splash-text": function (h) {
                document.querySelector("#large p").style.color = h;
            },
            "h1": function (h) {
                document.querySelector("#large h1").style.color = h;
            },
            "h2": function (h) {
                document.querySelector("#large h2").style.color = h;
                document.querySelector("#large h4").style.color = h;
            },
            "h3": function (h) {
                document.querySelector("#large h3").style.color = h;
                document.querySelector("#large h5").style.color = h;
            },
            "a": function (h) {
                document.querySelector("#large a").style.color = h;
                document.querySelector("#large a").style.borderBottom = `2px solid ${h}`;
            },
            "link-hover": function (h) {
                document.querySelector("#large a:hover").style.color = h;
            },
            "footer-color": function (h) {
                document.querySelector("#large #footer").style.background = h;
            },
            "footer-text": function (h) {
                document.querySelector("#large #footer").style.color = h;
            },
        },
        "features-radio": {
            "callout-color": function (h) {
                document.querySelector("#callout").style.backgroundColor = h;
            },
            "callout-text": function (h) {
                document.querySelector("#callout").style.color = h;
            },
            "dropdown-color": function (h) {
                document.querySelector("drop-down").style.backgroundColor = h;
            },
            "dropdown-hover": function (h) {
                document.querySelector("drop-down").style.backgroundColor = h;
            },
            "rubric-column": function (h) {
                document.querySelector("rubric").style.color = h;
            },
            "rubric-row": function (h) {
                document.querySelector("rubric").style.color = h;
            },
            "popup-color": function (h) {
                document.querySelector("popup").style.color = h;
                document.querySelector("popup:after").style.color = h;
                document.querySelector("popup span").style.color = h;
            }
        }
    };

function changeTemplate(hexcode) {
    var page = localStorage["page-selection"],
        general = localStorage["general"],
        features = localStorage["features-page"];
    console.log(hexcode, page, general, features);
    options[page][general](hexcode);
};

localStorage["page-selection"] = "small-radio";
localStorage["general"] = "outergrad";
localStorage["features-page"] = "callout-color";

document.onclick = function (e) {
    var hexcode,
        parent = "general";
    if (e.srcElement.parentNode.parentNode.id === "page-options") {
        localStorage["page-selection"] = e.srcElement.id;
    }
    if (e.srcElement.parentNode.parentNode.id === "general") {
        parent = e.srcElement.parentNode;
        localStorage["general"] = e.srcElement.id;
    }
    if (e.srcElement.parentNode.parentNode.id === "features-page") {
        parent = e.srcElement.parentNode;
        localStorage["features-page"] = e.srcElement.id;
    }
    if (e.srcElement.id.indexOf("#") > -1) {
        hexcode = e.srcElement.id.replace(/\s+/g, "");
        console.log(hexcode, e.srcElement);
        changeTemplate(hexcode);
    }
}
