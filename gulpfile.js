const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');


// BOOTSTRAP
gulp.task('bootstrap-css', gulp.series( () => {
   return gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
      .pipe(gulp.dest('src/css'));
}));
gulp.task('bootstrap-js', gulp.series( () => {
   return gulp.src([
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/popper.js/dist/umd/popper.min.js'
   ])
      .pipe(gulp.dest('src/js'));
}));


// FONT-AWESOME
gulp.task('font-awesome-css', gulp.series( () => {
   return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
      .pipe(gulp.dest('src/css'));
}));
gulp.task('font-awesome-fonts', gulp.series( () => {
   return gulp.src('node_modules/font-awesome/fonts/*')
      .pipe(gulp.dest('src/fonts'));
}));


// SASS COMPILER
gulp.task('sass', gulp.series( () => {
   return gulp.src('src/scss/**/*.scss')
      .pipe(sass({outputStyle: 'compressed'}))
      .pipe(autoprefixer())
      .pipe(gulp.dest('src/css'))
      .pipe(browserSync.stream());
}));


// STATIC SERVER + WATCHING SCSS/HTML FILES
gulp.task('serve', gulp.series( ['sass'], () => {
   browserSync.init({
      server: {
         baseDir: './src'
      },
      notify: false
   });
   gulp.watch('src/scss/**/*.scss', gulp.parallel( ['sass'] ));
   gulp.watch('src/*.html').on('change', browserSync.reload);
}));

gulp.task('default', gulp.series(['bootstrap-js', 'bootstrap-css', 'font-awesome-css', 'font-awesome-fonts', 'serve']));
