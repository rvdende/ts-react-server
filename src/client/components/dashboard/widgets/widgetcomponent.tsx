import * as React from 'react'
import { WidgetType, CorePacket } from '../interfaces';

export interface WidgetComponentProps {
    /** Settings relevant to this widget */
    widget: WidgetType
    /** This device full state */
    state: CorePacket
    /** Data value if drag and dropped from endpoint */
    value?: any
    /** Timestamp for this specific value */
    valueTimestamp?: Date
}

export interface WidgetOption {
    type: string
    default: any,
    value?: any
}

export interface WidgetOptions {
    [index: string]: WidgetOption;
}

export interface WidgetState {
    options: WidgetOptions
    [index: string]: any
}
export class WidgetComponent extends React.Component<WidgetComponentProps, WidgetState> {



    static getDerivedStateFromProps(props: WidgetComponentProps, state: WidgetState) {
        for (const opt of Object.keys(state.options)) {
            // default
            state.options[opt].value = state.options[opt].default

            // override
            if (props.widget.options) {
                if (props.widget.options[opt] !== undefined) {
                    state.options[opt].value = props.widget.options[opt]
                }
            }
        }
        return state;
    }

    options() {
        return this.state.options
    }
};

