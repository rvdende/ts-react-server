import { EventEmitter } from "events";
import styled from "styled-components";

const WRAP = styled.div`

`;

class API extends EventEmitter {
    constructor() {
        super();
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