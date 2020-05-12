import { EventEmitter } from "events";

const WebSocket = require('isomorphic-ws')

class API extends EventEmitter {

    //ws: WebSocket;

    constructor() {
        super();
        //this.ws = new WebSocket(location.origin.replace("http", "ws"));

        // this.ws.onmessage = (event) => {
        //     console.log('message recv', event.data)
        //     this.emit('socket', event.data)
        // }

        this.on('notification', (msg) => {
            console.log('api.ts test event', msg)
            // this.ws.send(JSON.stringify(msg));
        })


    }



    account: User = {
        naam: 'asdsad',
        surname: 'asdasd',
        age: 123,
        address: {
            code: 0,
            street: 'sadmklasd'
        }
    }


    test() {
        console.log('test!!@#')
    }
}



const apiinstance = new API()
const globalAny: any = global;
globalAny.api = apiinstance
export const api = apiinstance

interface User {
    naam: string
    surname: string
    age: number
    address: Address
}

interface Address {
    street: string
    code: number
}