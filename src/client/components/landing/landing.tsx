import * as React from "react";
import { Link } from "react-router-dom";

interface Props { }

interface State { }

export class Landing extends React.Component<Props, State> {
    state = {}

    static getDerivedStateFromProps(props: Props, state: State) {
        return props;
    }

    render() {
        return (
            <div style={{ padding: 20, border: "1px solid blue" }}>
                Landing page.
                Please <Link to="/login">login</Link> or <Link to="/register">register</Link>.</div>
        )
    }

}
