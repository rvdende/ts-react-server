/**
 * hosts socket server
 */
import { EventEmitter } from "events";
import * as ws from "ws";
import * as http from "http";
import * as https from "https";


export class SocketServer extends EventEmitter {
    ws: ws.Server;
    sockets: WebSocket[] | any = [];
    constructor(server: http.Server | https.Server) {
        super();
        this.ws = new ws.Server({ server });

        console.log('=== STARTING WS SERVER')

        this.ws.on('connection', (socket) => {
            socket.send('hello');

            console.log("ws connected");
            this.sockets.push(socket);

            socket.onmessage = (event) => {
                console.log(event.data);

                for (var s of this.sockets) {
                    let Sock: WebSocket = s;
                    try {
                        Sock.send(event.data.toString());
                    } catch (err) {

                    }

                }

            }

        });


    }


    send(data: string) {
        for (var s of this.sockets) {
            let Sock: WebSocket = s;
            try {
                Sock.send(data);
            } catch (err) {

            }

        }
    }
}