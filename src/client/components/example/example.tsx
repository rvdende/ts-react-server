import * as React from "react";

interface Props { }

interface State { }

export class Example extends React.Component<Props, State> {
    state = {}

    static getDerivedStateFromProps(props: Props, state: State) {
        return props;
    }

    render() {
        return (
            <div style={{ padding: 20, margin: 20, border: "1px solid blue" }}>Example component</div>
        )
    }

}
