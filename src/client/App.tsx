import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Link, NavLink, Switch } from "react-router-dom";
import { api } from './api'
import { Example } from "./components/example";

interface Props { }
interface State { counter: number, message: string, inputmessage: string }

export default class App extends React.Component<Props, State> {
    state = { counter: 0, message: '', inputmessage: '' }


    constructor(props: any) {
        super(props);
        api.test();

        api.on('socket', (data) => {
            this.setState({ message: JSON.stringify(data) })
        })

        setInterval(() => {
            this.setState({ counter: this.state.counter + 1 })
        }, 500)
    }

    render() {
        return (
            <div style={{ padding: 15 }}>
                <BrowserRouter>
                    <div>
                        <Link to='/'>Home</Link> | <Link to='/test'>Test</Link> | <Link to='/about'>About</Link>
                    </div>
                    <Switch>
                        <Route exact path="/">
                            <h1>Hello World</h1>
                            <p>To get started you can edit this file at /src/client/App.tsx. <br />
                            You should see this update in the browser when you save the file!</p>

                            <p>You can open another window and send messages between browsers.</p>

                            <div>
                                <input type='text' value={this.state.inputmessage} onChange={(e) => { this.setState({ inputmessage: e.target.value }) }} />
                                <button onClick={(e) => { api.ws.send(this.state.inputmessage); }} >SEND </button>
                            </div>

                            <div style={{ background: '#454545', color: 'lime', padding: 10 }}>
                                this.state.counter = {this.state.counter}<br />
                                this.state.message = {this.state.message}
                            </div>

                            <div>
                                <button onClick={(e) => {
                                    api.emit('notification', { test: 'foo' })
                                }} >TEST NOTIFICATION</button>
                            </div>

                            <Example pizza='pepperoni' />

                            <div>
                                For more info go to: <i className="fab fa-github"></i> <a href="https://github.com/rvdende/ts-react-server">https://github.com/rvdende/ts-react-server</a>
                            </div>
                        </Route>
                        <Route exact path="/test">
                            <h1>Test</h1>
                            <p>Test page</p>
                        </Route>
                        <Route exact path="/about">
                            <h1>About</h1>
                            <p>About page</p>
                        </Route>
                        <Route>
                            Error 404 Not found
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}


