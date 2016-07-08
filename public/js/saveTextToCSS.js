function saveTextToCSS() {
    var textToWrite = style,
        textFileAsBlob = new Blob([textToWrite], {
            type: 'text/css'
        }),
        fileNameToSaveAs = 'course',
        downloadLink = document.createElement("a"),
        small = document.querySelector("a[href*='small']"),
        large = document.querySelector("a[href*='large']"),
        coursejs = document.querySelector("a[href*='course']");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.URL !== null) {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    } else {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    }
    downloadLink.click();
}
