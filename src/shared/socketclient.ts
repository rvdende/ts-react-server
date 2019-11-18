import { EventEmitter } from "events";

const WebSocket = require('isomorphic-ws')

export class SocketClient extends EventEmitter {
    socket: WebSocket;

    /** should we auto refresh page on server restart? */
    livereload: boolean = false;

    constructor(opt?: { livereload?: boolean }) {
        super();
        console.log("connecting..")
        if (opt) {
            if (opt.livereload != undefined) this.livereload = opt.livereload;
        }
        this.socket = this.connectSocket();
    }

    connectSocket(opt?: any) {
        var uri = "ws://localhost:8080"
        if (location) {
            uri = location.origin.replace("http", "ws")
        }



        var socket = new WebSocket(uri);

        socket.onopen = () => {
            console.log("connected!")
            if (opt) { if (opt.reconnect) { this.reloadIfEnabled() } }
        }

        socket.onclose = () => {
            console.log("disconnected..")

            setTimeout(() => {
                console.log("reconnecting..")
                this.socket = this.connectSocket({ reconnect: true });
            }, 100)

        }

        return socket;
    }

    reloadIfEnabled() {
        if (this.livereload) {
            console.log("reload.."); window.location.reload(false);
        } else {
            console.log("live reload disabled.")
        }
    }
}