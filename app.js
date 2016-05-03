var path = require("path"),
    args = process.argv;

console.log(args);

//for (var i = 0; i < args.length; i++) {
//    console.log(args[i], path.basename(args[i]));
//}

//node app.js \\iDrive\CurrDevMedia\Projects\Courses\AMFD101\Banner\amfd-101.jpg

var link = 'http://mkweb.bcgsc.ca/color-summarizer/?url=static.flickr.com/37/88847543_d1eb68c5b9_m.jpg&precision=low&json=1';
console.log(link);