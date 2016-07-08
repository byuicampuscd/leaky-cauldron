var fireTemplateName,
    loadedTemplateData;

function saveToFire(name) {
    var currStyle = JSON.stringify(options);
    if (imgHold) {
        database.ref(name).update({
            style: currStyle,
            images: imgHold
        }, function () {
            undoRedoEnabled = true;
            $('.popupContain').remove();
            $("#saveStatus").html("Saved");
        })
    } else {
        database.ref(name).set({
            style: currStyle
        }, function () {
            undoRedoEnabled = true;
            $('.popupContain').remove();
            $("#saveStatus").html("Saved");
        })
    }
}

function displayData(d, div) {
    var data = d;
    var select = '<select>';

    for (var i in data) {
        select += '<option>' + i + '</option>';
    }
    select += '</select>';
    $('.loadedList').html(select);

    $(".loader").css({
        "display": "none"
    })
}

function readFromFire(div, func) {
    database.ref().once("value", function (snap) {
        loadedTemplateData = snap.val();
        func(loadedTemplateData, div);
    })
}

function saveScreen() {

    if (fireTemplateName) {
        saveToFire(fireTemplateName);
    } else {
        $(".shade").css({
            "display": "block"
        });
        $(".saveScreen").css({
            "display": "block"
        });

        var submit = $("input[value='Submit to Database'][type='button']"),
            courseNameInput = $("input[class='courseName']");

        submit.click(function () {
            var name = courseNameInput.val();
            fireTemplateName = name;
            saveToFire(name);
            $(".shade").css({
                "display": "none"
            });
        });

        var cancel = $("input[value='Cancel'][type='button']");

        cancel.click(function (e) {
            var modalParent = e.currentTarget.parentElement;
            $(modalParent).css({
                "display": "none"
            });
            $(".shade").css({
                "display": "none"
            });
        });

        var warning = $("<p><strong>Warning: </strong>You don't have any banners uploaded.  They will not be saved to the database.</p>");

        if ($(".header").children().length < 1) {
            $(".saveScreen")
                .append(warning);
        }

        // Disable undo/redo shortcut keys
        /*undoRedoEnabled is set in app.js*/
        undoRedoEnabled = false;
    }
}

function loadTemplateOptions() {

    //Clear exisiting banners, color suggestions, and the undo/redo arrays
    $(".header").html("");
    $("#colorPallete").html("");
    undo = [];
    redo = [];
    document.querySelector("#undoButton").disabled = true;
    document.querySelector("#redoButton").disabled = true;

    var selectValue = $(".loadScreen select").val(),
        newOptions = JSON.parse(loadedTemplateData[selectValue].style);

    fireTemplateName = selectValue;

    //CALL FUNCTION WITH TEXT IMAGE DATA

    for (image in loadedTemplateData[selectValue].images) {
        insertBanners(loadedTemplateData[selectValue].images[image], image, 'fireload');
    }

    for (option in options) {
        options[option].color = newOptions[option].color;
        options[option].setColor();
    }
    $('.loadContain').remove();
    // Change to small template
    document.querySelector("input[data-selector='small']").click();
};

function loadScreen() {

    $(".shade").css({
        "display": "block"
    });
    $(".loadScreen").css({
        "display": "block"
    });

    var submit = $("input[value='Load Template'][type='button']"),
        div = $("div[class='loadScreen']");

    submit.click(function () {
        loadTemplateOptions();
        $(".shade").css({
            "display": "none"
        });
        $(".loadScreen").css({
            "display": "none"
        });
    });

    var cancel = $("input[value='Cancel'][type='button']")
    cancel.click(function () {
        $(".shade").css({
            "display": "none"
        });
        $(".loadScreen").css({
            "display": "none"
        });
    });

    readFromFire(div, displayData);
}
