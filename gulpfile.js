let gulp = require('gulp');
let browserify = require('browserify');
let babelify = require('babelify');
let source = require('vinyl-source-stream');

const paths = {
    components: {
        dest: "",
        src: "",
        testDest: "",
        testSrc: ""
    }
};


gulp.task('bundle', function() {
    return browserify({
        entries: 'client/src/index.js',
    }).transform(babelify.configure({
            presets: ["es2015", "react"]
        }))
        .bundle()
        .on("error", function (err) { console.log("Error : " + err.message); })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('client/dist'));
});

gulp.task('createComponent', function() {
    console.log("unavailable")
});