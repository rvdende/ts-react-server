"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
/**
 * hosts socket server
 */
var events_1 = require("events");
var ws = require("ws");
var SocketServer = /** @class */ (function (_super) {
    __extends(SocketServer, _super);
    function SocketServer(server) {
        var _this = _super.call(this) || this;
        _this.sockets = [];
        _this.ws = new ws.Server({ server: server });
        console.log('=== STARTING WS SERVER');
        _this.ws.on('connection', function (socket) {
            socket.send('hello');
            console.log("ws connected");
            _this.sockets.push(socket);
            socket.onmessage = function (event) {
                console.log(event.data);
                for (var _i = 0, _a = _this.sockets; _i < _a.length; _i++) {
                    var s = _a[_i];
                    var Sock = s;
                    try {
                        Sock.send(event.data.toString());
                    }
                    catch (err) {
                    }
                }
            };
        });
        return _this;
    }
    return SocketServer;
}(events_1.EventEmitter));
exports.SocketServer = SocketServer;
