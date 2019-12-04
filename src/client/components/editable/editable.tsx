import * as React from "react";

import * as styles from "./style"

interface Props { }

interface State { }

export class Editable extends React.Component<Props, State> {
    state = {
        /** show editable to the user? */
        visible: true,
        sidebar: false
    }

    static getDerivedStateFromProps(props: Props, state: State) {
        return props;
    }

    render() {

        //sidebar

        if (this.state.sidebar) {
            return <div style={styles.sidebar}>
                <i className="fas fa-times" style={{ float: "right" }} onClick={() => { this.setState({ sidebar: false }) }} />

                <div>
                    Add component library

                    <div>DIV</div>
                    <div>GRID</div>
                </div>

                <div>
                    Properties
                </div>
            </div>
        }

        if (!this.state.visible) { return null }

        //button
        return (
            <div style={styles.smallbutton}>
                <i className="far fa-edit" onClick={() => { this.setState({ sidebar: true }) }} />
            </div>
        )
    }

}
