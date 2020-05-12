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
            <div style={{ padding: 15, margin: 20, height: 50, background: 'rgba(25,75,125,0.5)', borderRadius: 100 }}>
                Example pizza: {(this.props.pizza) && <span>{this.props.pizza}</span>}
            </div>
        )
    }

}