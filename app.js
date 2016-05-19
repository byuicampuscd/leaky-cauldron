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
            hex = `#${firstbit}${secbit}${thirbit}`,
            hexText = document.createTextNode(hex),
            hexTextPara = document.createElement("p");

        div.style.width = "100px";
        div.style.height = "50px";
        div.style.backgroundColor = hex;
        div.id = hex;
        hexTextPara.appendChild(hexText);
        div.appendChild(hexTextPara);
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

function changePreview(array) {
    document.querySelector('html').style.background = `radial-gradient(ellipse, ${array[1].value} 0%, ${array[0].value} 100%`;

    //SMALL TEMPLATE
    document.querySelector('#small h1').style.color = `${array[2].value}`;
    document.querySelector('#small h2').style.color = `${array[3].value}`;
    document.querySelector('#small h3').style.color = `${array[4].value}`;
    document.querySelector('#small h4').style.color = `${array[3].value}`;
    document.querySelector('#small h5').style.color = `${array[4].value}`;
    document.querySelector('#small a').style.color = `${array[5].value}`;
    document.querySelector('#small a').style.borderBottom = `2px solid ${array[5].value}`;

    //psuedo elements can't be set?
    //    console.log(document.querySelector('#small a'));
    //
    //    document.querySelector('#small a:hover').style.color = `${array[6].value}`;
    //    document.querySelector('#small a:hover').style.borderBottom = `2px solid ${array[6].value}`;
    //    document.querySelector('#small a:visited').style.color = `${array[6].value}`;
    //    document.querySelector('#small a:visited').style.borderBottom = `2px solid ${array[6].value}`;

    document.querySelector('#small #footer').style.color = `${array[8].value}`;
    document.querySelector('#small #footer').style.backgroundColor = `${array[7].value}`;

    //Large TEMPLATE
    document.querySelector('#large #article').style.color = `${array[9].value}`;
    document.querySelector('#large #article').style.backgroundColor = `${array[10].value}`;
    document.querySelector('#large h1').style.color = `${array[11].value}`;
    document.querySelector('#large h2').style.color = `${array[12].value}`;
    document.querySelector('#large h3').style.color = `${array[13].value}`;
    document.querySelector('#large h4').style.color = `${array[12].value}`;
    document.querySelector('#large h5').style.color = `${array[13].value}`;
    document.querySelector('#large a').style.color = `${array[14].value}`;
    document.querySelector('#large a').style.borderBottom = `2px solid ${array[14].value}`;

    //again from small
    //    document.querySelector('#large a:hover').style.color = `${array[15].value}`;
    //    document.querySelector('#large a:hover').style.borderBottom = `2px solid ${array[15].value}`;
    //    document.querySelector('#large a:visited').style.color = `${array[15].value}`;
    //    document.querySelector('#large a:visited').style.borderBottom = `2px solid ${array[15].value}`;

    document.querySelector('#large #footer').style.color = `${array[17].value}`;
    document.querySelector('#large #footer').style.backgroundColor = `${array[16].value}`;


    //FEATURES
    document.querySelector('#features .callout').style.color = `${array[19].value}`;
    document.querySelector('#features .callout').style.background = `${array[18].value}`;
    document.querySelector('#features .drop-down').style.background = `${array[20].value}`;
    //    document.querySelector('#features .drop-down:hover').style.background = `${array[21].value}`;
    document.querySelector('#features .rubric tr:first-child th').style.backgroundColor = `${array[22].value}`;
    document.querySelector('#features .rubric th').style.backgroundColor = `${array[23].value}`;
    document.querySelector('#features #main .popup').style.borderBottom = `${array[24].value}`;
    document.querySelector('#features #main span').style.background = `${array[24].value}`;
    //    document.querySelector('#features #main .popup:after').style.borderColor = `${array[24].value} transparent`;

}

document.getElementById('files').addEventListener('change', handleFileSelect, false);

var options = {
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
}

document.onclick = function (e) {
    var hexcode;
    if (e.srcElement.parentNode.parentNode.id === "page-options") {
        localStorage["page-selection"] = e.srcElement.id;
    } else if (e.srcElement.parentNode.parentNode.id === "general") {
        localStorage["general"] = e.srcElement.id;
    } else if (e.srcElement.id.indexOf("#") > -1) {
        hexcode = e.srcElement.id.replace(/\s+/g, "");;
        console.log(hexcode);
    }
    console.log(e.srcElement.id, e.srcElement.parentNode.id, e.srcElement.parentNode.parentNode.id);
}
