// Options set
var selectedRadio = "innergrad",
    undo = [],
    redo = [],
    undoRedoEnabled = true;

/*undoRedoEnabled also is used in firebaseLink.js*/

// Update selectedRadio everytime a radio button is clicked
$("#general input[type='radio']").click(function () {
    selectedRadio = this.id;
    $("#colorPicker").spectrum("set", options[selectedRadio].color);
});

// Color Picker
$("#colorPicker").spectrum({
    flat: true,
    color: "#406986",
    showButtons: false,
    showInput: true,
    preferredFormat: "hex",
    move: function (color) {
        $("#saveStatus").html("");
        options[selectedRadio].color = color.toHexString();
        options[selectedRadio].setColor();
    }
});

/* Change Page */
function changePage() {
    var page = this.event.srcElement.dataset.selector,
        selector = "#" + page + ", #" + page + "-options";
    // Close all pages and feature options
    $("#small, #large, #features, #css-output, #small-options, #large-options, #features-options").css("display", "none");
    // Display selected page and options
    $(selector + ", #general").css("display", "block");
    $("#color-wrapper").css("display", "");
    // Display correct color suggestions
    if (page === "small" || page === "features") {
        $("#largeBannerSuggestions").css("display", "none");
        $("#smallBannerSuggestions").css("display", "");
    } else {
        $("#smallBannerSuggestions").css("display", "none");
        $("#largeBannerSuggestions").css("display", "");
    }
    // Update selectedRadio
    selectedRadio = document.querySelector("#" + page + "-options input:checked").id;
    // Update colorPicker
    $("#colorPicker").spectrum("set", options[selectedRadio].color);
}

// Each time the colorPicker is clicked to make a change the current color is saved in the undo array
$("#colorPicker").on("dragstart.spectrum", function (e, color) {
    updateUndo(options[selectedRadio].color);
});

function updateUndo(oldColor) {
    undo.push({
        page: document.querySelector("#page-options input:checked").dataset.selector,
        key: selectedRadio,
        color: oldColor
    });
    // Make sure undo button isn't disabled
    document.querySelector("#undoButton").disabled = false;
    // Reset redo
    redo = [];
    document.querySelector("#redoButton").disabled = true;
}

function applyUndo() {
    var undoColor,
        pageSelector;
    if (undo.length > 0) {
        undoColor = undo.pop();
        if (undoColor.page != document.querySelector("#page-options input:checked").dataset.selector) {
            pageSelector = "input[data-selector='" + undoColor.page + "']";
            document.querySelector(pageSelector).click();
            undo.push(undoColor);
            return;
        }
        redo.push({
            page: undoColor.page,
            key: undoColor.key,
            color: options[undoColor.key].color
        });

        options[undoColor.key].color = undoColor.color;
        options[undoColor.key].setColor();
        $("#colorPicker").spectrum("set", undoColor.color);
        document.querySelector("#" + undoColor.key).checked = true;
        selectedRadio = undoColor.key;
        document.querySelector("#redoButton").disabled = false;
    }
    if (undo.length === 0) {
        document.querySelector("#undoButton").disabled = true;
    }
    $("#saveStatus").html("");
}

function applyRedo() {
    var redoColor,
        pageSelector;
    if (redo.length > 0) {
        redoColor = redo.pop();
        if (redoColor.page != document.querySelector("#page-options input:checked").dataset.selector) {
            pageSelector = "input[data-selector='" + redoColor.page + "']";
            document.querySelector(pageSelector).click();
            redo.push(redoColor);
            return;
        }
        undo.push({
            page: redoColor.page,
            key: redoColor.key,
            color: options[redoColor.key].color
        });
        pageSelector = "input[data-selector='" + redoColor.page + "']";
        document.querySelector(pageSelector).click();
        options[redoColor.key].color = redoColor.color;
        options[redoColor.key].setColor();
        $("#colorPicker").spectrum("set", redoColor.color);
        document.querySelector("#" + redoColor.key).checked = true;
        selectedRadio = redoColor.key;
        document.querySelector("#undoButton").disabled = false;
    }
    if (redo.length === 0) {
        document.querySelector("#redoButton").disabled = true;
    }
    $("#saveStatus").html("");
}

document.onkeydown = function () {
    if (undoRedoEnabled) {
        if (event.which === 85) {
            applyUndo();
        } else if (event.which === 82) {
            applyRedo();
        }
    }
};
