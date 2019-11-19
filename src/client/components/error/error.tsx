import * as React from "react";

interface Props { }

interface State { }

export class ErrorDisplay extends React.Component<Props, State> {
    state = {}

    static getDerivedStateFromProps(props: Props, state: State) {
        return props;
    }

    render() {
        return (
            <div style={{ padding: 20, border: "1px solid blue" }}>
                404 not found
            </div>
        )
    }

}
