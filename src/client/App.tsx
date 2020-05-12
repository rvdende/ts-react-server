import { hot } from 'react-hot-loader/root'

import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Link, NavLink, Switch } from "react-router-dom";
import { api } from './api'
import { Example } from "./components/example";
import { ThemeProvider } from 'styled-components';
import { themeList, ThemeDefinition, GlobalStyles } from "./theme";
import history from './utils/history';

interface Props { }
interface State { counter: number, message: string, inputmessage: string, themeNo: number }

class App extends React.Component<Props, State> {
    state: State = { counter: 0, message: '', inputmessage: '', themeNo: 0 }
    interval: number

    constructor(props: any) {
        super(props)
    }

    componentDidMount() {
        this.interval = window.setInterval(
            () => this.setState(prevState => ({ counter: prevState.counter - 1 })),
            200,
        )
    }

    generateString1() {
        return "3"
    }

    generateString2 = () => {
        return "5"
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        const theme = themeList[this.state.themeNo]
        return (
            <div style={{ padding: 15 }}>
                <ThemeProvider theme={theme}>
                    <GlobalStyles />
                    <BrowserRouter>
                        <div>
                            <Link to='/'>Home</Link> | <Link to='/test'>Test</Link> | <Link to='/about'>About</Link>
                        </div>
                        <Switch>
                            <Route exact path="/">
                                <h1>Hello World!2345521</h1>
                                <p>To get started you can edit this file at /src/client/App.tsx. <br />
                            You should see this update in the browser when you save the file!</p>

                                <div>
                                    <button onClick={(e) => {
                                        if (this.state.themeNo === 0) {
                                            this.setState({ themeNo: 1 })
                                        } else {
                                            this.setState({ themeNo: 0 })

                                        }
                                    }} >toggle theme</button>
                                </div>

                                <div>
                                    Font awesome support:

                                    <i className='fas fa-times' />
                                </div>

                                <p>You can open another window and send messages between browsers.</p>



                                <div>
                                    <input type='text' value={this.state.inputmessage} onChange={(e) => { this.setState({ inputmessage: e.target.value }) }} />
                                    <button onClick={(e) => {
                                        // api.ws.send(this.state.inputmessage); 
                                    }} >SEND </button>
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

                                <Example somevalue='foobar1' />

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
                </ThemeProvider>
            </div>
        )
    }
}


export default hot(App)