import { hot } from 'react-hot-loader/root'

import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Link, NavLink, Switch } from "react-router-dom";
import { api } from './api'
import { ThemeProvider } from 'styled-components';
import { themeList, ThemeDefinition, GlobalStyles } from "./theme";
import history from './utils/history';
import Threed from './components/threed';
import Dashboard from './components/dashboard/dashboard';
import { dashboardService } from './components/dashboard/dashboardService';
import { DashboardState } from './components/dashboard/interfaces';

interface Props { }
interface State {
    counter: number,
    message: string,
    inputmessage: string,
    theme: any,
    dashboardState: DashboardState
}

class App extends React.Component<Props, State> {
    state: State = {
        counter: 0,
        message: '',
        inputmessage: '',
        theme: themeList[0],
        dashboardState: undefined
    }


    constructor(props: any) {
        super(props)
    }

    componentDidMount() {
        api.test();

        api.on('socket', (data) => {
            console.log(data);
            this.setState({ message: data })
        })

        dashboardService.getstate({ key: 'test' }, (dashboardState) => {
            this.setState({ dashboardState: dashboardState.data })
        }, (error) => {

        })

        api.loadThemes((themes) => {
            this.setState({ theme: themes.mainTheme })
        })

        api.on('theme', (theme) => {
            this.setState({ theme })
        })
    }



    render() {

        if (!this.state.dashboardState) { return <div>loading...</div> }

        if (this.state.dashboardState) {

            return (
                <div style={{ padding: 15 }}>
                    <ThemeProvider theme={this.state.theme}>
                        <GlobalStyles />
                        <BrowserRouter>
                            <Dashboard state={this.state.dashboardState} editMode={true} />

                            <Switch>
                                <Route exact path="/">
                                    <div>
                                        home
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
}


export default hot(App)