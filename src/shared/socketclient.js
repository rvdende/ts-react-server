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
var events_1 = require("events");
var WebSocket = require('isomorphic-ws');
var SocketClient = /** @class */ (function (_super) {
    __extends(SocketClient, _super);
    function SocketClient(opt) {
        var _this = _super.call(this) || this;
        /** should we auto refresh page on server restart? */
        _this.livereload = false;
        console.log("connecting..");
        if (opt) {
            if (opt.livereload != undefined)
                _this.livereload = opt.livereload;
        }
        _this.socket = _this.connectSocket();
        return _this;
    }
    SocketClient.prototype.connectSocket = function (opt) {
        var _this = this;
        var uri = "ws://localhost:8080";
        if (location) {
            uri = location.origin.replace("http", "ws");
        }
        var socket = new WebSocket(uri);
        socket.onopen = function () {
            console.log("connected!");
            if (opt) {
                if (opt.reconnect) {
                    _this.reloadIfEnabled();
                }
            }
        };
        socket.onclose = function () {
            console.log("disconnected..");
            setTimeout(function () {
                console.log("reconnecting..");
                _this.socket = _this.connectSocket({ reconnect: true });
            }, 100);
        };
        return socket;
    };
    SocketClient.prototype.reloadIfEnabled = function () {
        if (this.livereload) {
            console.log("reload..");
            window.location.reload(false);
        }
        else {
            console.log("live reload disabled.");
        }
    };
    return SocketClient;
}(events_1.EventEmitter));
exports.SocketClient = SocketClient;
