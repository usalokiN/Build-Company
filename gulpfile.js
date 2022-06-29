const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');

// Static Server + watching scss/html files
gulp.task('server', ['sass'], function() {

    browserSync.init({
        server: "src"
    });

    gulp.watch("src/scss/*.scss", ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/scss/*.+(scss|sass)")
        .pipe(sass({outputStyle:'cpmpressed'}).on('error',sass.logError))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});
gulp.task('watch', function (){
   gulp.watch("src/scss/*.+(scss|sass)", gulp.parallel('sass'))
    gulp.watch('src/*.html').on('change',browserSync.reload);
});


gulp.task('default', gulp.parallel('server', 'sass'));