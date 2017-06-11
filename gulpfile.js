var gulp = require('gulp');
var debug = require('gulp-debug');//вывозд в консоль при сборке
var clean = require('gulp-clean');
var webpackStream = require('webpack-stream');
var webpack = require('webpack');

const args = process.argv;

const isKostya = args.some(function (a) {
    return a == '--ribalko'
});

const isDenis = args.some(function (a) {
    return a == '--slavinski'
});

const isVetal = args.some(function (a) {
    return a == '--gusarov'
});


var OnetrakWeb = 'C:/OneTrack-Web/static/mytrak/';


if(isVetal){
    OnetrakWeb = '/Users/v.gusarov/Documents/projects-onetrak/OneTrack-Web/static/mytrak/'
}

if(isKostya){
    OnetrakWeb = 'D:/Projects/OneTrack-Web/static/mytrak/'
}

if(isDenis){
    OnetrakWeb = '/Users/NewJS' //OneTrack-Web/static/mytrak/'
}


//Чистим public в OnetrakWeb
gulp.task('clean', function (callback) {//Чистим public перед тем как писать так мы обезопасим от копирования старого
    gulp.src('public', {cwd: OnetrakWeb, read: false})
        .pipe(debug({title: 'Delete public in production pj'}))
        .pipe(clean());
    callback()
});

//Вызываем webpack собираем билд
gulp.task('wp', function (callback) {
    //Нужен чтобы Запустить билд в режиме прод
    process.env.NODE_ENV = 'production'
    var wp_options = require('./webpack.production.js');

    return gulp.src("./develop/app.js")
        .pipe(debug({title: 'webpack'}))
        .pipe(webpackStream(wp_options))
        .pipe(gulp.dest('public/'), {base: ''}) //Base меняет базовую часть относителого пути файла 'develop/js/' на пусто чтобы потом перенести все в public

});

//Копируем файлы в OnetrakWeb
gulp.task('copyFiles',['wp'], function (callback) {
    gulp.src('public/**/*.*')
        .pipe(debug({title: '---------COPY Public-------------'}))
        .pipe(gulp.dest('public', {cwd: OnetrakWeb}));

    callback()
});


gulp.task('default', ['prod']);
//gulp.task('build', ['copyVendor', 'styles','wp'])
gulp.task('prod', ['clean', 'wp', 'copyFiles'])