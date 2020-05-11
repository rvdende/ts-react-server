'use strict';
import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Link, NavLink, Switch } from "react-router-dom";
import { SocketClient } from "../shared/socketclient"

/** Edit this. */
import { NavBar } from "./components/navbar/navbar"
import { Landing } from "./components/landing/landing";
import { ErrorDisplay } from "./components/error/error";
import { Register } from "./components/register/register";
import { Login } from "./components/login/login";

import { Editable } from "./components/editable/editable"

import { api } from './api'

interface Props { }
interface State { }

export class App extends Component<Props, State> {
    state = {}


    ws: SocketClient; /** used for live reloading */

    constructor(props: any) {
        super(props);
        this.ws = new SocketClient({ livereload: true });

        api.test();

    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div style={{ padding: 50 }}>
                        <h1>Hello world.</h1>
                        <h2>TEJKLSAMLKSDA     123123123</h2>
                        <p>To get started you can edit this file at /src/client/client.tsx. <br />
                            You should see this update in the browser when you save the file!</p>

                        <button onClick={(e) => {
                            api.emit('notification', api.account)
                        }} >TEST NOTIFICATION</button>

                        For more info go to: <i className="fab fa-github"></i> <a href="https://github.com/rvdende/ts-react-server">https://github.com/rvdende/ts-react-server</a>
                    </div>

                    <Editable />
                    <NavBar />
                    <Switch>
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route component={ErrorDisplay} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}



render(<App />, document.getElementById("app"));