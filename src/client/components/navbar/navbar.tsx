import * as React from "react";
import { Link } from "react-router-dom";
import { api } from "../../api";

interface Props { }

interface State { }

export class NavBar extends React.Component<Props, State> {
    state = {}

    static getDerivedStateFromProps(props: Props, state: State) {
        return props;
    }

    render() {
        return (
            <div style={{ padding: 20, border: "1px solid blue" }}>
                LOGO <Link to="/">home</Link>

                <button onClick={(e) => {
                    api.test();
                }} > TEST </button>
            </div>
        )
    }

}
