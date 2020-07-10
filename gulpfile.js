const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');

gulp.task('sass', gulp.series( () => {
   return gulp.src([
      'node_modules/bootstrap/scss/bootstrap.scss',
      'src/scss/*.scss'
   ])
   .pipe(sass({outputStyle: 'compressed'}))
   .pipe(gulp.dest('src/css'))
   .pipe(browserSync.stream());
}));

gulp.task('js', gulp.series( () => {
   return gulp.src([
      'node_modules/bootstrap/dist/js/bootstrap.js',
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/popper.js/dist/umd/popper.min.js'
   ])
   .pipe(gulp.dest('src/js'))
   .pipe(browserSync.stream());
}));

gulp.task('font-awesome', gulp.series( () => {
   return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
   .pipe(gulp.dest('src/css'));
}));

gulp.task('fonts', gulp.series( () => {
   return gulp.src('node_modules/font-awesome/fonts/*')
   .pipe(gulp.dest('src/fonts'))
}));

gulp.task('serve', gulp.series( ['sass'], () => {
   browserSync.init({
      server: {
         baseDir: './src'
      }
   });
}));
gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], gulp.parallel( ['sass'] ));
gulp.watch(['src/*.html']).on('change', browserSync.reload);

gulp.task('default', gulp.series(['font-awesome','fonts','js','serve']));
