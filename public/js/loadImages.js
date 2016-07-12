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
        flexContainer = document.createElement("div"),
        currentPage = "";

    // Check that a page is being viewed and not the css
    if (document.querySelector("#page-selection input:checked") != null) {
        currentPage = document.querySelector("#page-selection input:checked").dataset.selector;
    }

    // If current page is features use small
    if (currentPage === "features") {
        currentPage = "small";
    }

    // Hide the color suggestions for banner not being viewed
    if (!cssTemplate.includes(currentPage)) {
        flexContainer.style.display = "none";
    }
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
    });
}

/*
Put the banners into the application.
*/
function insertBanners(e, filename, state) {

    var img = new Image();
    var img2 = new Image();

    /*If the state is fireload then load the data
    from firebase.*/
    if (state === "fireload") {
        img.src = e;

        if (filename.includes("small")) {
            img2.src = e;
            var colorThief = new ColorThief(),
                image = new CanvasImage(img2, filename + "Two");
        }
    } else if (state === "new") {
        img.src = e.target.result;

        if (filename.includes("small")) {
            img2.src = e.target.result;
            var colorThief = new ColorThief(),
                image = new CanvasImage(img2, filename + "Two");
        }
    }

    imgHold[filename] = img.src;

    var colorThief = new ColorThief(),
        image = new CanvasImage(img, filename),
        domColor = colorThief.getColor(img),
        pallete = colorThief.getPalette(img),
        get = getHexPallete(domColor, pallete, filename);
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

            var filename = theFile.name.replace(/\.[^/.]+$/, "");
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
