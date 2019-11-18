/**
 * hosts socket server
 */
import { EventEmitter } from "events";
import * as ws from "ws";
import * as http from "http";
import * as https from "https";


export class SocketServer extends EventEmitter {
    wss: ws.Server;

    constructor(server: http.Server | https.Server) {
        super();
        this.wss = new ws.Server({ server });

        this.wss.on('connection', (socket: any) => {
            console.log("ws connected")
        });
    }
}