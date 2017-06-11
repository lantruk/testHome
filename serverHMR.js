var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.develop.js');
var express = require('express');
var fs = require('fs');
var path = require('path');
var url = require('url');
var request = require('request');
var port = 3001;
var ROOT = 'D:/GitProject/Preppy_OneTrack-Mytrak-ReactRedux/';
//var ROOT = '../OneTrack-ClientSideWeb/';

const args = process.argv;

const isKostya = args.some(function (a) {
    return a == '--ribalko'
});

const isLeha = args.some(function (a) {
    return a == '--franchko'
});

const isVetal = args.some(function (a) {
    return a == '--gusarov'
});

console.log(args, isVetal)

var app = new (require('express'))();


//Конифигурационный файл вебпака
var compiler = webpack(config);
//webpackDevMiddleware - сердце WP dev-server

console.log(config.output.publicPath)
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {colors: true},
    warn: false
}));
//app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));

app.use(webpackHotMiddleware(compiler));

//Подставим виртуальный путь для реальных файлов
app.use('/static/mytrak', express.static('./'));
//app.use( express.static(config.output.publicPath,express.static('./')));
//app.use('/static/mytrak/develop/',express.static(path.normalize(ROOT + config.output.publicPath)));


app.get('/', function (req, res) {
    console.log(req.url)
    res.sendFile(__dirname + '/html_main.html')
});

//Если обращения к апишке то пропустим
app.get(/.*crash.*?|.*api.*?|.*media.*?|.*profiles.*?/, toApi);
app.post(/.*crash.*?|.*api.*?|.*media.*?|.*profiles.*?/, toApi);
app.put(/.*crash.*?|.*api.*?|.*media.*?|.*profiles.*?/, toApi);
app.delete(/.*crash.*?|.*api.*?|.*media.*?|.*profiles.*?/, toApi);


function toApi(req, res) {
    var headers = req.headers;
    var method = req.method;
    var parsedUrl = url.parse(req.url);
    var filePath = parsedUrl.pathname;
    var body = [];


    req.on('error', function (err) {
        console.error(err);
    }).on('data', function (chunk) {
        body.push(chunk);
    }).on('end', function () {
        body = Buffer.concat(body).toString();

        if (filePath.match('crash') || filePath.match('api') || filePath.match('media')) {
            //пробросить запрос на инстанс
            skipToInstanseServer(res, headers, method, parsedUrl, body)
        }
        /*else {
         //Отдать статику
         returnStatic(filePath, res)
         }*/
    })
}

function skipToInstanseServer(res, headers, method, parsedUrl, body) {

    var mytrak = '/mytrak';

    console.log(parsedUrl.pathname)

    if (parsedUrl.pathname.match('media') || parsedUrl.pathname.match('crash') || parsedUrl.pathname.match('upgrade_bracelets')) { //Игорь добавил для изменения 'upgrade' =>   || parsedUrl.pathname.match('upgrade_bracelets')
        mytrak = ''
    }

    if (parsedUrl.pathname.match('api') && parsedUrl.pathname.match('mytrak')) {
        console.log('прошла сучка')
        mytrak = ''
    }
var url = 'https://onetrak.ru' + mytrak + parsedUrl.path;
    
    //var url = 'http://localhost:8008' + mytrak + parsedUrl.path;
    //var url = 'http://gusarov.onetrak.ru:8000' + mytrak + parsedUrl.path;

    console.log(url)

    //Установка cookie
    var j = request.jar();
    console.log('isKostya ------------', isKostya)
    if (isKostya) {
        var cookie = request.cookie('sessionid=19qp5b1bu31cny4kntt66tyxjtfltp8f;');
    }

    if (isLeha) {
        var cookie = request.cookie('sessionid=qpzs0ut2dlzxdtjb7jcaq8z5kmnfayvp');
    }

    if (isVetal) {
        var cookie = request.cookie('sessionid=h1jglku8wtce9gkkom8ytr9fpcnfs0zt');
    }

    j.setCookie(cookie, url);

    //Проброс запроса
    var options = {
        url: url,
        method: method,
        headers: headers,
        jar: j,
        encoding: null
    };

    if (method === 'POST' || method === 'PUT') {
        //console.log(body)
        options.body = body
    }

    console.log(method)
    request(options, function (error, response, body) {

        if (error) {
            console.error('response error')
            console.error(error)
            res.writeHead(500)
            res.write('Instanse Server is done');
            res.end()
            return
        }

        res.writeHead(response.statusCode, response.headers)
        res.write(body);
        res.end()
    })

}

app.listen(port, function () {
    console.log('Listening on port ', port)
});

module.exports = app