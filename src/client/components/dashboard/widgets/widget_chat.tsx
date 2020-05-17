import React from 'react';
import { WidgetComponent, WidgetState } from './widgetcomponent'
import styled from 'styled-components';
import { api } from '../../../api';
import { Input } from '../input';
import { Button } from '../button';
import { clone } from '../dashboard';


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
        inputmessage: '',
        log: []
    }

    interval: any;

    componentDidMount() {
        api.on('socket', (data) => {
            let log = clone(this.state.log);
            log.push(data);
            this.setState({ log })
        })
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        return (
            <WidgetBasicWrap>
                <h1>Chat</h1>

                <div>
                    <pre>{JSON.stringify(this.state.log, null, 2)}</pre>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Input type='text' value={this.state.inputmessage} onChange={(e) => { this.setState({ inputmessage: e.target.value }) }} />
                    <Button onClick={(e) => {
                        api.ws.send(this.state.inputmessage);
                    }} text='Send' />
                </div>

            </WidgetBasicWrap>
        );
    }
};

