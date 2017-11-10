/********
Get the BLOB data from the images uploaded and get
the dominant color scheme to append to the document
*********/

var imgHold = {};

/*
Get the dominant color scheme.
*/
function getHexPallete(domColor, pallete, cssTemplate) {
    "use strict";
    pallete.unshift(domColor);
    var palleteArray = [],
        flexContainer = document.createElement("div");

    flexContainer.id = cssTemplate + "Suggestions";

    // Determine which suggestions to show or hide based off which page is currently selected
    for (var i = 0; i < pallete.length; i++) {
        var firstbit = pallete[i][0].toString(16),
            secbit = pallete[i][1].toString(16),
            thirbit = pallete[i][2].toString(16),
            div = document.createElement("div"),
            hex = `#${firstbit}${secbit}${thirbit}`;
        div.style.backgroundColor = hex;
        div.id = hex;
        document.querySelector("#colorPallete").appendChild(flexContainer);
        flexContainer.appendChild(div);
        palleteArray.push(hex);
    }

    // Add click event handler
    $("#colorPallete div > div").click(function () {
        $("#saveStatus").html("");
        updateUndo(options[selectedRadio].color);
        options[selectedRadio].color = this.id;
        options[selectedRadio].setColor();
        $("#colorPicker").spectrum("set", options[selectedRadio].color);
        evaluator();
    });
}

/*
Put the banners into the application.
*/
function insertBanners(e, filename, state) {
    var img = new Image();
    //    var img2 = new Image();

    img.onload = function () {
        var colorThief = new ColorThief();
        var image = new CanvasImage(img);
        var domColor = colorThief.getColor(img),
            pallete = colorThief.getPalette(img),
            get = getHexPallete(domColor, pallete, filename);

        // clone the canvas for each new banner insert
        function cloneColorThief(){
            return cloneCanvas(document.querySelector("canvas:last-child"));
        }
        var suggestionCanvas = cloneColorThief();
        document.querySelector("#colorPallete").append(suggestionCanvas);
    }
    if (state === "new") {
        img.src = e.target.result;
    }

    imgHold[filename] = img.src;
}

/****** ADB: cloneCanvas *********************
 * Makes a copy of an existing canvas so the old
 * one will stay put when you try to do crap.
 * Thanks stackexchange...
 *************************************************/
function cloneCanvas(oldCanvas) {
    var newCanvas = document.createElement('canvas');
    var context = newCanvas.getContext('2d');
    newCanvas.width = oldCanvas.width;
    newCanvas.height = oldCanvas.height;
    context.drawImage(oldCanvas, 0, 0);
    return newCanvas;
}

/*
Handle the files that are uploaded into the application
*/
function handleFileSelect(evt) {
    "use strict";

    //Clear exisiting banners
    $(".header").html("");

    var files = evt.target.files;

    for (var i = 0, f; f = files[i]; i++) {
        if (!f.type.match('image.*')) {
            $("#loadError").html("");
            $("#loadError").append("Error!  Must load only images.");
            continue;
        }

        var reader = new FileReader();
        // Closure to capture the file information.
        reader.onload = (function (theFile) {

            var filename = theFile.name.replace(/\.[^/.]+$/, "").toLowerCase();
            return function (e) {
                insertBanners(e, filename, 'new');
            };

        })(f);
        // Read in the image file as a data URL.
        reader.readAsDataURL(f);

        $("#saveStatus").html("");
    }
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);
