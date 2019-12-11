import * as React from "react";

interface Props { pizza?: string }

interface State { }

export class Example extends React.Component<Props, State> {
    state = {}

    static getDerivedStateFromProps(props: Props, state: State) {
        return props;
    }

    render() {
        return (
            <div style={{ padding: 20, border: "1px solid blue" }}>
                Example component
                {(this.props.pizza) && <span>{this.props.pizza}</span>}
            </div>
        )
    }

}
