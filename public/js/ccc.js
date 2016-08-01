/****************
This file contains all the functions in order to calculate
the color contrast based off of the hex codes inputed from
the application.
*****************/


var ccc = new ColorContrastChecker();

/* EXAMPLE FOR COLOR CONTRAST CHECKER
var color1 = "#f0f0f0";
var color2 = "#ff0000";

if (ccc.isLevelAA(color1, color2, 16)) {
    console.log(ccc.isLevelAA(color1, color2, 16));
} else {
    console.log(ccc.isLevelAA(color1, color2, 16));
}
*/


/*USE TO TEST HEX PERCENTAGE*/
//console.log(color_meter("#c78d56", "#040404"));


function errorHandler(bool, opt) {
    if (bool === false) {
        $("#" + opt).parent().attr("title", opt + " does not pass AA Color Contrast").css({
            "border": "2px solid red"
        })
    } else if (bool === true) {
        $("#" + opt).parent().attr("title", "Passes AA Color Contrast").css({
            "border": "none"
        })
    } else {
        $("#" + opt).attr("title", "No background color assigned")
    }
}

function evaluator() {

    var getType = {},
        isFunction,
        perc;

    for (var i in options) {

        isFunction = options[i].backColor && getType.toString.call(options[i].backColor) === '[object Function]';

        if (isFunction) {
            errorHandler(ccc.isLevelAA(options[i].backColor(), options[i].color, 16), i);
//            perc = color_meter(options[i].color, options[i].backColor());
        } else {
            console.log("No background color");
        }
    }
}
