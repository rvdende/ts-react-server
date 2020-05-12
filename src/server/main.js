"use strict";
exports.__esModule = true;
var express = require("express");
var path = require("path");
var http = require("http");
var webpack_config_1 = require("./webpack.config");
var webpack = require('webpack');
var middleware = require('webpack-dev-middleware');
var expressapp = express;
var app = expressapp();
var port = 8080;
// app.get('/', (req, res) => res.send('Hello World!'))
app.use(express.static(path.resolve(__dirname, '../../public')));
app.use(express.static(path.resolve(__dirname, '../../build/client')));
var compiler = webpack(webpack_config_1.webpackConfig);
app.use(middleware(compiler, {}));
app.use(require("webpack-hot-middleware")(compiler));
// Handles any requests that don't match the ones above
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '../../../public/index.html'));
});
var serverhttp = http.createServer(app);
// used for live update
// var wss = new SocketServer(serverhttp);
serverhttp.listen(port, function () { return console.log("ts-react-server listening on port http://localhost:" + port + "/ !"); });
