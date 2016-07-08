var errorArray = [];

function color_meter(cwith, ccolor) {

    if (!cwith && !ccolor) return;

    var _cwith = (cwith.charAt(0) == "#") ? cwith.substring(1, 7) : cwith,
        _ccolor = (ccolor.charAt(0) == "#") ? ccolor.substring(1, 7) : ccolor,
        _r = parseInt(_cwith.substring(0, 2), 16),
        _g = parseInt(_cwith.substring(2, 4), 16),
        _b = parseInt(_cwith.substring(4, 6), 16),
        __r = parseInt(_ccolor.substring(0, 2), 16),
        __g = parseInt(_ccolor.substring(2, 4), 16),
        __b = parseInt(_ccolor.substring(4, 6), 16),
        p1 = (_r / 255) * 100,
        p2 = (_g / 255) * 100,
        p3 = (_b / 255) * 100,
        perc1 = Math.round((p1 + p2 + p3) / 3),
        p1 = (__r / 255) * 100,
        p2 = (__g / 255) * 100,
        p3 = (__b / 255) * 100,
        perc2 = Math.round((p1 + p2 + p3) / 3);

    return Math.abs(perc1 - perc2);
}

/*Color Constrast Checker*/
function checker(page, names) {

    names.forEach(function (name) {

        var foregroundColor,
            returnedOpt,
            contrastThreshold = 45;

        if (page === "small") {

            foregroundColor = options[name].color;

            returnedOpt = color_meter(foregroundColor, "#f0f0f0");

            if (returnedOpt <= contrastThreshold) {
                var error = name + " failed. --- " + returnedOpt + "%";
                errorArray.push(error)
            }
        } else if (page === "large") {

            foregroundColor = options[name].color;

            returnedOpt = color_meter(foregroundColor, "#125576");

            if (returnedOpt <= contrastThreshold) {
                var error = name + " failed. --- " + returnedOpt + "%";
                errorArray.push(error)
            }

        } else if (page === "features") {
            foregroundColor = options[name].color;

            returnedOpt = color_meter(foregroundColor, "#f0f0f0");

            if (returnedOpt <= contrastThreshold) {
                var error = name + " failed. --- " + returnedOpt + "%";
                errorArray.push(error)
            }
        }
    })
}

function checkContrast() {

    var colorContrast = $("<div class='colorContrast'></div>"),
        div = $("<div class='contrastScreen'></div>"),
        shade = $("<div class='shade'></div>"),
        h2 = $("<h2>Color Contrast Checker</h2>"),
        para = $("<p>Application is set to approve 40% contrast.</p>"),
        cancel = $("<input value='Cancel' type='button'>").css({
            "margin-left": "5px"
        }).click(function () {
            $('.colorContrast').remove();
        });

    $(div).append(h2).append(para);


    var smallColorCheck = ["h1"
                      , "h2"
                      , "h3"
                      , "a"
                      , "aHover"
                          ],
        largeColorCheck = ["splashColor"
                      , "splashH1"
                      , "splashH2"
                      , "splashH3"
                      , "splashA"
                      , "splashAHover"
                      , "splashFooterColor"
                      ],
        calloutColorCheck = ["calloutColor"];

    checker("small", smallColorCheck);
    checker("large", largeColorCheck);
    checker("features", calloutColorCheck);

    errorArray.forEach(function (errorString) {
        var errorMessage;
        if (errorString) {
            errorMessage = $("<p>" + errorString + "</p>");
        } else {
            errorMessage = $("<p>Good Contrast!</p>");
        }
        $(div).append(errorMessage);
    })

    if (errorArray.length === 0) {
        var approval = "<h4>All approved!</h4>";
        $(div).append(approval);
    }

    $(div).append(cancel)
    $(colorContrast).append(div).append(shade);
    $("body").append(colorContrast);

    errorArray = [];
}
