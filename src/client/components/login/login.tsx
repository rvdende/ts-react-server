import * as React from "react";
import { Link } from "react-router-dom";

interface Props { }

interface State { }

export class Login extends React.Component<Props, State> {
    state = {}

    static getDerivedStateFromProps(props: Props, state: State) {
        return props;
    }

    render() {
        return (
            <div style={{ padding: 20, border: "1px solid blue" }}>
                Login component.<br />
                Need to <Link to="/register">register</Link> instead?
            </div>
        )
    }

}
