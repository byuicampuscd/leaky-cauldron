var options = {
    innergrad: {
        color: "#406986",
        setColor: function () {
            $("#template-wrapper").css("background", "radial-gradient(ellipse, " + this.color + " 0%, " + options.outergrad.color + " 100%)");
        }
    },
    outergrad: {
        color: "#16344a",
        setColor: function () {
            $("#template-wrapper").css("background", "radial-gradient(ellipse, " + options.innergrad.color + " 0%, " + this.color + " 100%)");
        }
    },
    h1: {
        color: "#333333",
        setColor: function () {
            $("#small h1").css("color", this.color);
        }
    },
    h2: {
        color: "#2d5d94",
        setColor: function () {
            $("#small h2, #features h2, #small h4, #features h4").css("color", this.color);
        }
    },
    h3: {
        color: "#5f6060",
        setColor: function () {
            $("#small h3, #features h3, #small h5, #features h5").css("color", this.color);
        }
    },
    a: {
        color: "#2d5d94",
        setColor: function () {
            $("#small a.default").css("color", this.color);
            $("#small a.default").css("borderColor", this.color);
        }
    },
    aHover: {
        color: "#7b4c8d",
        setColor: function () {
            $("#small a.hover").css("color", this.color);
            $("#small a.hover").css("borderColor", this.color);
        }
    },
    prepareLabel: {
        color: "#49807b",
        setColor: function () {
            $(".prepareBanner .label").css("background", this.color);
        }
    },
    prepareActivity: {
        color: "#8ed0cb",
        setColor: function () {
            $(".prepareBanner .activityType").css("background", this.color);
        }
    },
    teachLabel: {
        color: "#537491",
        setColor: function () {
            $(".teachBanner .label").css("background", this.color);
        }
    },
    teachActivity: {
        color: "#9abad6",
        setColor: function () {
            $(".teachBanner .activityType").css("background", this.color);
        }
    },
    ponderLabel: {
        color: "#8163a5",
        setColor: function () {
            $(".ponderBanner .label").css("background", this.color);
        }
    },
    ponderActivity: {
        color: "#baa4d4",
        setColor: function () {
            $(".ponderBanner .activityType").css("background", this.color);
        }
    },
    footerColor: {
        color: "#e2e2e2",
        setColor: function () {
            $("#small .footer, #features .footer").css("color", this.color);
        }
    },
    footerBackground: {
        color: "#2d5d94",
        setColor: function () {
            $("#small .footer, #features .footer").css("backgroundColor", this.color);
        }
    },
    splashBackground: {
        color: "#125576",
        setColor: function () {
            $("#large .article").css("backgroundColor", this.color);
        }
    },
    splashColor: {
        color: "#eaeaea",
        setColor: function () {
            $("#large .article").css("color", this.color);
        }
    },
    splashH1: {
        color: "#fafafa",
        setColor: function () {
            $("#large h1").css("color", this.color);
        }
    },
    splashH2: {
        color: "#a1d7ff",
        setColor: function () {
            $("#large h2, #large h4").css("color", this.color);
        }
    },
    splashH3: {
        color: "#c3c3c3",
        setColor: function () {
            $("#large h3, #large h5").css("color", this.color);
        }
    },
    splashA: {
        color: "#a1d7ff",
        setColor: function () {
            $("#large a.default").css("color", this.color);
            $("#large a.default").css("borderColor", this.color);
        }
    },
    splashAHover: {
        color: "#c08fd3",
        setColor: function () {
            $("#large a.hover").css("color", this.color);
            $("#large a.hover").css("borderColor", this.color);
        }
    },
    splashFooterColor: {
        color: "#e2e2e2",
        setColor: function () {
            $("#large .footer").css("color", this.color);
        }
    },
    splashFooterBackground: {
        color: "#133955",
        setColor: function () {
            $("#large .footer").css("backgroundColor", this.color);
        }
    },
    calloutBackground: {
        color: "#e3ded1",
        setColor: function () {
            $("#features .callout").css("backgroundColor", this.color);
        }
    },
    calloutColor: {
        color: "#2d5d94",
        setColor: function () {
            $("#features .callout").css("color", this.color);
        }
    },
    dropdownBackground: {
        color: "#6c6c6c",
        setColor: function () {
            $("#features .drop-down.default").css("backgroundColor", this.color);
        }
    },
    dropdownHover: {
        color: "#7f7f7f",
        setColor: function () {
            $("#features .drop-down.hover").css("backgroundColor", this.color);
        }
    },
    columnHeading: {
        color: "#1e435d",
        setColor: function () {
            $("#features table tr:first-child th").css("backgroundColor", this.color);
        }
    },
    rowHeading: {
        color: "#2d5d94",
        setColor: function () {
            $("#features table tr:nth-child(n+2) th").css("backgroundColor", this.color);
        }
    },
    popup: {
        color: "#274b66",
        setColor: function () {
            $("#popupWord").css("borderColor", this.color);
            $("#popupMessage").css("backgroundColor", this.color);
            $("#popupTriangle").css("borderTopColor", this.color);
        }
    }
};
