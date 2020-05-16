import React from 'react';
import { WidgetComponent, WidgetState } from './widgetcomponent'
import styled from 'styled-components';


const WidgetBasicWrap = styled.div`
    text-align: center;
    height: 100%;
`;

export default class WidgetSimple extends WidgetComponent {
    state: WidgetState = {
        options: {
            someval: { type: 'input', default: 'foo', value: undefined },
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
            <WidgetBasicWrap>
                {this.state.options.someval.value}<br />
                {this.state.count}
            </WidgetBasicWrap>
        );
    }
};

