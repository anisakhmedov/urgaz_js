// npm i gulp gulp-autoprefixer gulp-clean-css gulp-sass node-sass sass
import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import nodeSass from 'node-sass';

const sass = gulpSass(dartSass); // SCSS/SASS

// sources
const paths = {
    styles: {
        src: {
            custom: './assets/**/*.scss',
        },
        dist: './assets/css'
    }
}

sass.compiler = nodeSass

// styles custom optimize
function CustomStyles() {
    return gulp.src(paths.styles.src.custom)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(autoprefixer({ overrideBrowserslist: ['> 1%'], cascade: false }))
        .pipe(cleanCSS({ level: 1 }))
        .pipe(gulp.dest(paths.styles.dist))
}

function watch() {
    gulp.watch(paths.styles.src.custom, CustomStyles)
}

gulp.task('styles', CustomStyles)
gulp.task('watch', watch)

gulp.task('build', gulp.parallel(CustomStyles))
gulp.task('default', gulp.series('build', 'watch'))
