import React from 'react';
import { WidgetComponent, WidgetState } from './widgetcomponent'
import styled from 'styled-components';


const WidgetBasicWrap = styled.div`
    height: 100%;
    padding: 20px;
    h1 {
        font-size: 28px;
        font-weight: bold;
        color: ${({ theme }) => theme.focusColor};
    }

 

`;

export default class WidgetChat extends WidgetComponent {
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
            <WidgetBasicWrap>
                <h1>Chat</h1>
            </WidgetBasicWrap>
        );
    }
};

