function handleFileSelect(evt) {
    var files = evt.target.files;

    for (var i = 0, f; f = files[i]; i++) {

        if (!f.type.match('image.*')) {
            continue;
        }

        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function (theFile) {
            return function (e) {
                var img = new Image();
                img.src = e.target.result;

                var colorThief = new ColorThief();
                var image = new CanvasImage(img);

                var domColor = colorThief.getColor(img);
                var pallete = colorThief.getPalette(img);

                console.log(pallete);

                for (var i = 0; i < pallete.length; i++) {
                    console.log(pallete[i]);
                    console.log(pallete[i][0], pallete[i][1], pallete[i][2]);
                    var div = document.createElement("div");
                    div.style.width = "200px";
                    div.style.height = "200px";
                    div.style.backgroundColor = `rgb(${pallete[i][0]}, ${pallete[i][1]}, ${pallete[i][2]})`;
                    document.body.appendChild(div);
                }
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);