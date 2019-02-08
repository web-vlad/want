var gulp = require("gulp");

/* параметры для gulp-autoprefixer */
/*var autoprefixerList = [
    'Chrome >= 45',
    'Firefox ESR',
    'Edge >= 12',
    'Explorer >= 10',
    'iOS >= 9',
    'Safari >= 9',
    'Android >= 4.4',
    'Opera >= 30'
];*/

// Plug in the Gulp plugins
var sass = require("gulp-sass"), // переводит SASS в CSS
    pug = require('gulp-pug'),
    cssnano = require("gulp-cssnano"), // Минимизация CSS
    browsersync = require('browser-sync'), // Подключаем Browser Sync
    rigger = require('gulp-rigger'), // модуль для импорта содержимого одного файла в другой
    autoprefixer = require('gulp-autoprefixer'), // Проставлет вендорные префиксы в CSS для поддержки старых браузеров
    imagemin = require('gulp-imagemin'), // Сжатие изображений
    concat = require("gulp-concat"), // Объединение файлов - конкатенация
    uglify = require("gulp-uglify"), // Минимизация javascript
    rename = require("gulp-rename"), // Переименование файлов
    //jshint = require('gulp-jshint'), // error js
    spritesmith = require('gulp.spritesmith'), //Sprite
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    del = require('del'); // Подключаем библиотеку для удаления файлов и папок

gulp.task('browser-sync', function() {
 browsersync({
 server: {
 baseDir: 'build'
 },
 notify: false,
 // open: false,
 // tunnel: true,
 // tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
 })
 // Ссылка живет минут 20
 });

// clean folder dist
gulp.task('clean', function() {
    return del.sync('build'); // Удаляем папку dist перед сборкой
});

// Copy HTML files to the dist folder
gulp.task("html", function() {
    return gulp.src("src/*.html")
        .pipe(gulp.dest("build"));
});

// Combine, compile Sass in CSS, install Vend. prefixes and further minimization of the code
gulp.task("sass", function() {
    return gulp.src("src/sass/*.scss")
        //.pipe(plumber())
        .pipe(sourcemaps.init())
        //.pipe(concat('style.scss'))
        .pipe(sass())
        /*.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))*/
        //.pipe(cssnano())
        .pipe(sourcemaps.write())
        //.pipe(plumber.stop())
        //.pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("build/css"));
});

// Joining and Compressing JS Files
gulp.task("libs-css", function() {
    return gulp.src("src/libs/*.css")
        .pipe(concat('libs.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("build/css"));
});

// Joining and Compressing JS Files
/*gulp.task("libs-js", function() {
    return gulp.src("src/libs/*.js") // директория откуда брать исходники
        .pipe(concat('scripts.js')) // объеденим все js-файлы в один
        //.pipe(uglify()) // вызов плагина uglify - сжатие кода
        .pipe(rename({ suffix: '.min' })) // вызов плагина rename - переименование файла с приставкой .min
        .pipe(gulp.dest("src/js")); // директория продакшена, т.е. куда сложить готовый файл
});*/

gulp.task("scripts", function() {
    return gulp.src("src/js/**/*") // директория откуда брать исходники
        .pipe(rigger())
        .pipe(gulp.dest("build/js")); // директория продакшена, т.е. куда сложить готовый файл
});


// Compress the pictures
gulp.task('images', function() {
    return gulp.src("src/images/**/*.+(jpg|jpeg|png|gif)")
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true
        }))
        .pipe(gulp.dest("build/images"))
});

// Compress the pictures
gulp.task('img', function() {
    return gulp.src("src/img/**/*.+(jpg|jpeg|png|gif)")
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true
        }))
        .pipe(gulp.dest("build/img"))
});

// SPRITS
gulp.task('sprite', function() {
    var spriteData =
        gulp.src('src/sprites/*.*') // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: '_sprite.scss',
                cssFormat: 'scss',
                algorithm: 'binary-tree',
                padding: 1,
                //cssTemplate: 'scss.template.mustache',
                cssVarMap: function(sprite) {
                    sprite.name = 's-' + sprite.name
                }//
            }));

    spriteData.img.pipe(gulp.dest('build/css/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('src/sass/')); // путь, куда сохраняем стили
});

// fonts
var buildFonts = gulp.src('src/fonts/**/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest('build/fonts'))

// post
var post = gulp.src("src/*.php")
    .pipe(gulp.dest('build/'))

// The task of tracking changed files
gulp.task("watch", function() {
    gulp.watch("src/*.html", ["html"]);
    gulp.watch("src/template/*.html", ["html"]);
    gulp.watch("src/js/*.js", ["scripts"]);
    gulp.watch("src/sass/*.scss", ["sass"]);
    gulp.watch("src/images/**/*.+(jpg|jpeg|png|gif)", ["images"]);
    gulp.watch("src/img/**/*.+(jpg|jpeg|png|gif)", ["img"]);
    gulp.watch('src/*.html', browsersync.reload);
});

///// Tasks ///////////////////////////////////////

// Running Default Tasks
gulp.task("default", ["clean", "html", "sass", "libs-css", "scripts", "images", "img", "sprite", "browser-sync", "watch"]);
