/*
These functions are for the buttons on the application
to change the page colors quickly
*/

function desaturateTOA() {
    // Update color values
    options.prepareActivity.color = "#8ed0cb";
    options.prepareLabel.color = "#477470";
    options.teachActivity.color = "#9abad6";
    options.teachLabel.color = "#50718e";
    options.ponderActivity.color = "#baa4d4";
    options.ponderLabel.color = "#7b619c";
    // Set colors
    options.prepareActivity.setColor();
    options.prepareLabel.setColor();
    options.teachActivity.setColor();
    options.teachLabel.setColor();
    options.ponderActivity.setColor();
    options.ponderLabel.setColor();
}

function saturateTOA() {
    // Update color values
    options.prepareActivity.color = "#50d0c6";
    options.prepareLabel.color = "#198278";
    options.teachActivity.color = "#66afef";
    options.teachLabel.color = "#1b65a7";
    options.ponderActivity.color = "#c89efa";
    options.ponderLabel.color = "#753cba";
    // Set colors
    options.prepareActivity.setColor();
    options.prepareLabel.setColor();
    options.teachActivity.setColor();
    options.teachLabel.setColor();
    options.ponderActivity.setColor();
    options.ponderLabel.setColor();
}

function useSmallColors() {
    // Update color values
    options.splashBackground.color = "#f0f0f0";
    options.splashColor.color = "#3e3e3e";
    options.splashH1.color = options.h1.color;
    options.splashH2.color = options.h2.color;
    options.splashH3.color = options.h3.color;
    options.splashA.color = options.a.color;
    options.splashAHover.color = options.aHover.color;
    options.splashFooterBackground.color = options.footerBackground.color;
    options.splashFooterColor.color = options.footerColor.color;
    // Set colors
    options.splashBackground.setColor();
    options.splashColor.setColor();
    options.splashH1.setColor();
    options.splashH2.setColor();
    options.splashH3.setColor();
    options.splashA.setColor();
    options.splashAHover.setColor();
    options.splashFooterBackground.setColor();
    options.splashFooterColor.setColor();
}
