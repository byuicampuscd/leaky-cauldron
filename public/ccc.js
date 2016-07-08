function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

var darkOrLight = function (forObj, backObj) {

    var foreground,
        background,
        contrast;

    foreground = (forObj.r * 299) + (forObj.g * 587) + (forObj.b * 114);

    background = (backObj.r * 299) + (backObj.g * 587) + (backObj.b * 114);

    contrast = foreground / background;

    // values range from 0 to 1
    // anything greater than 0.5 should be bright enough for dark text
    if (contrast >= 0.5) {
        return {
            fail: true,
            message: "The text is below 50% contrast ratio.",
            contrast: contrast
        };
    } else {
        return {
            fail: false,
            message: "The test approves!",
            contrast: contrast
        };
    }

}
