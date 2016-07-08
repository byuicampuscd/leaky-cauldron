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
    $('.loadedSelect').html(select);
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
        var popupContain = $("<div class='popupContain'></div>"),
            div = $("<div class='saveScreen'></div>"),
            shade = $("<div class='shade'></div>"),
            h2 = $("<h2>Save Template</h2>"),
            para = $("<p>This will save your current CSS template to a database.  Please input the course title.</p>"),
            courseNameInput = $("<input type='text' class='courseName' placeholder='Input course name here'>").css({
                "margin-bottom": "5px",
                "padding": "2.5px"
            }),
            submit = $("<input value='Submit to Database' type='button'>").click(function () {
                var name = courseNameInput.val();
                fireTemplateName = name;
                saveToFire(name);
            }),
            cancel = $("<input value='Cancel' type='button'>").css({
                "margin-left": "5px"
            }).click(function () {
                $('.popupContain').remove();
                undoRedoEnabled = true;
            }),
            warning = $("<p><strong>Warning: </strong>You don't have any banners uploaded.  They will not be saved to the database.</p>");

        $(div).append(h2).append(para).append(courseNameInput);

        if ($(".header").children().length < 1) {
            $(div).append(warning);
        }

        $(div).append(submit).append(cancel);

        $(popupContain).append(div).append(shade);

        // Disable undo/redo shortcut keys
        undoRedoEnabled = false;

        $("body").append(popupContain);
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

    var loadContain = $("<div class='loadContain'></div>"),
        loadedSelect = $("<div class='loadedSelect'><div class='loader'></div></div>"),
        div = $("<div class='loadScreen'></div>"),
        shade = $("<div class='shade'></div>"),
        h2 = $("<h2>Load Template</h2>"),
        para = $("<p>This screen will load any saved templates.</p>"),
        submit = $("<input value='Load Template' type='button'>").click(function () {
            loadTemplateOptions();
        }),
        cancel = $("<input value='Cancel' type='button'>").css({
            "margin-left": "5px"
        }).click(function () {
            $('.loadContain').remove();
        });

    $(div).append(h2).append(para).append(loadedSelect).append(submit).append(cancel);

    $(loadContain).append(div).append(shade);

    $("body").append(loadContain);

    readFromFire(div, displayData);
}
