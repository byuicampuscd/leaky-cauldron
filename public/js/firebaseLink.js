/**************************************************
File has all the functions that link the application
to the data that is found in Firebase.  File contains
save and load functions.  These functions will either
save or load the data and display the necessary
information requested.
****************************************************/

var departmentCode,
    loadedTemplateData,
    courseID;

function pushEdit(name, num, userName) {
    database.ref(`${name}/${num}/edits`).push({
        name: userName,
        timeStamp: firebase.database.ServerValue.TIMESTAMP
    });
}

function updateFirebase(name, num) {
    var currStyle = JSON.stringify(options),
        userName = localStorage["leakyCauldronDisplayName"];

    database.ref(`${name}/${num}`).update({
        style: currStyle
    }, function () {
        undoRedoEnabled = true;
        $('.popupContain').remove();
        $("#saveStatus").html("Saved");
        pushEdit(name, num, userName);
    });
}

/*
Save data to firebase
*/
function saveToFire(name, num, domain) {
    var currStyle = JSON.stringify(options),
        userName = localStorage["leakyCauldronDisplayName"];

    database.ref(`${name}/${num}`).update({
        style: currStyle,
        images: imgHold,
        domain: domain
    }, function () {
        undoRedoEnabled = true;
        $('.popupContain').remove();
        $("#saveStatus").html("Saved");
        pushEdit(name, num, userName);
    });

}

function displayCourses(e) {

    $(".courses").css({
        "display": "none"
    })

    var selectedDept = e.target.value;

    $(`#${selectedDept}`).css({
        "display": "block"
    })
}

/*
Display the data requested
*/
function displayData(d, id) {
    var data = d;
    var select = $(`<select id="${id}"></select>`);

    for (var i in data) {
        $(select).append('<option>' + i + '</option>');

        var selectTwo = $(`<select class="courses" id="${i}"></select>`).css({
            "display": "none"
        });

        for (var j in data[i]) {
            console.log(data[i][j], j);
            $(selectTwo).append('<option>' + j + '</option>');
        }

//        $(selectTwo).click()
        $('.courseLoad').append(selectTwo);

    }

    $(select).click(displayCourses);

    $('.loadedDept').html(select);

    $(".loader").css({
        "display": "none"
    })
}

/*
Request the data from Firebase
*/
function readFromFire(func) {
    if (!departmentCode && !courseID) {
        database.ref("courses").once("value", function (snap) {
            loadedTemplateData = snap.val();
            func(loadedTemplateData, "deptName");
        })
    }
}

/*
Show a screen to indicate saving data to Firebase
*/
function saveScreen() {

    if (departmentCode && courseID) {
        updateFirebase(departmentCode, courseID);
    } else {

        var submit = $("input[value='Submit to Database'][type='button']"),
            dept = $("input[class='department']"),
            courseNum = $("input[class='courseNum']"),
            domain = $("input[class='domain']");

        $(".shade").css({
            "display": "block"
        });
        $(".saveScreen").css({
            "display": "block"
        });

        submit.click(function () {

            var name = dept.val().split(" ")[0].trim().toUpperCase(),
                num = courseNum.val().trim(),
                dom = domain.val().trim().toLowerCase();

            departmentCode = name;
            courseID = num;

            if (departmentCode && courseID && dom) {
                saveToFire(departmentCode, courseID, dom);
                $(".shade").css({
                    "display": "none"
                });
            } else {
                $("#saveScreenError").html('');
                $("#saveScreenError").append('You must fill out each box in order to save.');
            }

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
            $(".saveScreen").append(warning);
        }

        // Disable undo/redo shortcut keys
        /*undoRedoEnabled is set in app.js*/
        undoRedoEnabled = false;
    }
}

/*
With the requested data from firebase then display the data
to the application.
*/
function loadTemplateOptions() {

    //Clear exisiting banners, color suggestions, and the undo/redo arrays
    $(".header").html("");
    $("#colorPallete").html("");
    undo = [];
    redo = [];
    document.querySelector("#undoButton").disabled = true;
    document.querySelector("#redoButton").disabled = true;

    var dept = $(".loadScreen #deptName").val(),
        courseNum = $(`.loadScreen #${dept}`).val(),
        newOptions = JSON.parse(loadedTemplateData[dept][courseNum].style),
        newImages = loadedTemplateData[dept][courseNum].images;

    departmentCode = dept;
    courseID = courseNum;

    //CALL FUNCTION WITH TEXT IMAGE DATA

    for (image in newImages) {
        insertBanners(newImages[image], image, 'fireload');
    }

    for (option in options) {
        options[option].color = newOptions[option].color;
        options[option].setColor();
    }

    evaluator();

    // Change to small template
    document.querySelector("input[data-selector='small']").click();
};

/*
Load screen to request data from Firebase
*/
function loadScreen() {

    var submit = $(".loadScreen input[value='Load Template'][type='button']"),
        div = $("div[class='loadScreen']");

    submit.prop("disabled", false);

    $(".shade").css({
        "display": "block"
    });
    $(".loadScreen").css({
        "display": "block"
    });

    submit.click(function () {
        submit.prop("disabled", true);

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

    readFromFire(displayData);
}
