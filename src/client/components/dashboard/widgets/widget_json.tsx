import React from 'react';
import { WidgetComponent, WidgetState } from './widgetcomponent'
import styled from 'styled-components';


const Terminal = styled.pre`
    color: ${({ theme }) => theme.brandSpot};
    background: ${({ theme }) => theme.bodyAlt};
`;

export default class WidgetJSON extends WidgetComponent {
    state: WidgetState = {
        options: {
            someval: { type: 'input', default: 'foo', value: undefined },
            textcol: { type: 'color', default: 'foo', value: undefined }
        },
        count: 0
    }

    interval: any;

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState(state => ({ count: state.count + 1 }))
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        return (
            <Terminal>
                {JSON.stringify(this.props, null, 2)}
            </Terminal>
        );
    }
};

