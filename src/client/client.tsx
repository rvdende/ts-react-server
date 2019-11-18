'use strict';
import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { SocketClient } from "../shared/socketclient"

/** Edit this. */
import { Example } from "./components/example/example";

interface Props { }
interface State { }

export class App extends Component<Props, State> {
    state = {}


    ws: SocketClient; /** used for live reloading */

    constructor(props: any) {
        super(props);
        this.ws = new SocketClient({ livereload: true });
    }

    render() {
        return (
            <div style={{ padding: 50 }}>
                Welcome to ts-react-server.<br />
                To get started edit <b>/src/client/client.tsx</b><br />
                This will reload on save automatically.

                <Example />

                See <b>/src/client/components/example</b>
            </div>
        )
    }
}



render(<App />, document.getElementById("app"));