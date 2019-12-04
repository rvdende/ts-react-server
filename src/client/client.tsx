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
            <div>
                <BrowserRouter>
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