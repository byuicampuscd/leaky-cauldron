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
    // Add click event handler
    $("#colorPallete main > div").click( function () {
        options[selectedRadio].color = this.id;
        options[selectedRadio].setColor();
        $("#colorPicker").spectrum("set", options[selectedRadio].color);
    });
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
    downloadLink.click(updateColor);
}

function cssTemplate() {
    var style = `
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
/******
    SPLASH PAGE STYLING
*****/
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
/******
    FEATURES STYLING
*******/
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
`;
//    saveTextAsFile(style);
    document.querySelector("textarea").innerHTML = style;
    return style;
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);

/* Change Page */
function changePage() {
    var page = this.event.srcElement.dataset.selector,
        selector = "#" + page + ", #" + page + "-options";
    
    // Close all pages and feature options
    $("#small, #large, #features, #small-options, #large-options, #features-options").css("display", "none");
    
    // Display selected page and options
    $(selector).css("display", "block");
    
    // Update selectedRadio
    selectedRadio = document.querySelector("#" + page + "-options input:checked").id;
    
    // Update colorPicker
    $("#colorPicker").spectrum("set", options[selectedRadio].color);
}

// Options set
var options = {
    innergrad : {
        color: "#406986",
        setColor: function() { $("html").css("background", "radial-gradient(ellipse, " + this.color +" 0%, " + options.outergrad.color + " 100%)"); }
    },
    outergrad : {
        color: "#16344a",
        setColor: function() { $("html").css("background", "radial-gradient(ellipse, " + options.innergrad.color +" 0%, " + this.color + " 100%)"); }
    },
    h1 : {
        color: "#333333",
        setColor: function() { $("#small h1").css("color", this.color); }
    },
    h2 : {
        color: "#2d5d94",
        setColor: function() { $("#small h2, #small h4").css("color", this.color); }
    },
    h3 : {
        color: "#5f6060",
        setColor: function() { $("#small h3, #small h5").css("color", this.color); }
    },
    a : {
        color: "#2d5d94",
        setColor: function() { $("#small a.default").css("color", this.color);
                               $("#small a.default").css("borderColor", this.color); }
    },
    aHover : {
        color: "#7b4c8d",
        setColor: function() { $("#small a.hover").css("color", this.color);
                               $("#small a.hover").css("borderColor", this.color); }
    },
    footerColor : {
        color: "#e2e2e2",
        setColor: function() { $("#small .footer").css("color", this.color); }
    },
    footerBackground : {
        color: "#2d5d94",
        setColor: function() { $("#small .footer").css("backgroundColor", this.color); }
    },
    splashBackground : {
        color: "#125576",
        setColor: function() { $("#large .article").css("backgroundColor", this.color); }
    },
    splashColor : {
        color: "#eaeaea",
        setColor: function() { $("#large .article").css("color", this.color); }
    },
    splashH1 : {
        color: "#fafafa",
        setColor: function() { $("#large h1").css("color", this.color); }
    },
    splashH2 : {
        color: "#a1d7ff",
        setColor: function() { $("#large h2, #large h4").css("color", this.color); }
    },
    splashH3 : {
        color: "#c3c3c3",
        setColor: function() { $("#large h3, #large h5").css("color", this.color); }
    },
    splashA : {
        color: "#a1d7ff",
        setColor: function() { $("#large a.default").css("color", this.color);
                               $("#large a.default").css("borderColor", this.color); }
    },
    splashAHover : {
        color: "#c08fd3",
        setColor: function() { $("#large a.hover").css("color", this.color);
                               $("#large a.hover").css("borderColor", this.color); }
    },
    splashFooterColor : {
        color: "#e2e2e2",
        setColor: function() { $("#large .footer").css("color", this.color); }
    },
    splashFooterBackground : {
        color: "#133955",
        setColor: function() { $("#large .footer").css("backgroundColor", this.color); }
    },
    calloutBackground : {
        color: "#e3ded1",
        setColor: function() { $("#features .callout").css("backgroundColor", this.color); }
    },
    calloutColor : {
        color: "#2d5d94",
        setColor: function() { $("#features .callout").css("color", this.color); }
    },
    dropdownBackground : {
        color: "#6c6c6c",
        setColor: function() { $("#features .drop-down.default").css("backgroundColor", this.color); }
    },
    dropdownHover : {
        color: "#7f7f7f",
        setColor: function() { $("#features .drop-down.hover").css("backgroundColor", this.color); }
    },
    columnHeading : {
        color: "#1e435d",
        setColor: function() { $("#features table tr:first-child th").css("backgroundColor", this.color); }
    },
    rowHeading : {
        color: "#2d5d94",
        setColor: function() { $("#features table tr:nth-child(n+2) th").css("backgroundColor", this.color); }
    },
    popup : {
        color: "#274b66",
        setColor: function() { $("#features .popup").css("borderColor", this.color);
                               $("#features .popup span").css("backgroundColor", this.color);}
    }
};

var selectedRadio = "innergrad";
// Update selectedRadio everytime a radio button is clicked
$("#general input").click(function() {
    selectedRadio = this.id;
    $("#colorPicker").spectrum("set", options[selectedRadio].color);
});

$("#showSuggestions").click( function() {
    $("#customColor").css("display", "none");
    $("#colorSuggestions").css("display", "inline-block");
});
$("#showColorPicker").click( function() {
    $("#colorSuggestions").css("display", "none");
    $("#customColor").css("display", "inline-block");
    
});


// Color Picker
$("#colorPicker").spectrum({
    flat: true,
    color: "#406986",
    showButtons:false,
    showInput: true,
    preferredFormat: "hex",
    move: function(color) {
        options[selectedRadio].color = color.toHexString();
        options[selectedRadio].setColor();
    }
});