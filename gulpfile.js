const gulp = require("gulp");
const buffer = require("vinyl-buffer");
const browserify = require("browserify");
const watchify = require("watchify");
const babel = require("babelify");
const source = require("vinyl-source-stream");


function compile(watch) {
    let bundler = watchify(browserify({ entries:"client/src/index.js"}).transform(babel));

    function rebundle() {
        bundler.bundle()
            .on("error", function(err) { console.error(err); this.emit("end"); })
            .pipe(source("bundle.js"))
            .pipe(buffer())
            .pipe(gulp.dest("./client/dist"));
        console.log("Build finished!");
    }

    if (watch) {
        bundler.on("update", function() {
            console.log("Building...");
            rebundle();
        });
    }

    rebundle();
}

function watch() {
    return compile(true);
}

gulp.task("build", function() { return compile(); });
gulp.task("watch", function() { return watch(); });

gulp.task("default", ["build"]);