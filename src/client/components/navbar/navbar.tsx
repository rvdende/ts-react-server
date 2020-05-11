import * as React from "react";
import { Link } from "react-router-dom";
import { api } from "../../api";

interface Props { }

interface State {
    notifications: number
}

export class NavBar extends React.Component<Props, State> {
    state = {
        notifications: 0
    }

    componentDidMount = () => {
        api.on('notification', this.handlemessage)
    }

    componentWillUnmount = () => {
        api.removeListener('notification', this.handlemessage)
    }

    handlemessage = (message: any) => {
        this.setState({ notifications: this.state.notifications + 1 })
    }

    // static getDerivedStateFromProps(props: Props, state: State) {
    //     return props;
    // }

    // constructor (props) {
    //     super(prop);
    // }

    render() {
        return (
            <div style={{ padding: 20, border: "1px solid blue" }}>
                LOGO <Link to="/">home</Link>

                notification: {this.state.notifications}

                <button onClick={(e) => {
                    api.test();

                }} > TEST </button>
            </div>
        )
    }

}
