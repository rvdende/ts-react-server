import React from 'react';
import { WidgetComponent, WidgetState } from './widgetcomponent'
import styled, { css } from 'styled-components';
const ReactMarkdown = require('react-markdown')

const WidgetTextStyled = styled.div`
    color: ${({ theme }) => theme.text};
    height: 100%;
    padding: ${({ theme }) => theme.padding};
    padding-top: 0;
    text-align: left;
    font-size: 12px;
    margin: 0px;
    display: flex;
    flex-direction: row;
`;

export const TextArea = styled.textarea`
    color: ${({ theme }) => theme.brandSpot};
    background: ${({ theme }) => theme.bodyAlt};
    border: none;
    padding: ${({ theme }) => theme.padding};
    padding: 15px;
`;

export default class WidgetText extends WidgetComponent {
    state: WidgetState = {
        options: {
            editAble: { type: 'checkbox', default: 'foo', value: undefined }
        },
        content: ''
    }

    render() {
        return (
            <WidgetTextStyled>
                {(this.state.options.editAble.value) && <div style={{ height: '100%', background: 'gray', width: '50%' }}>
                    <TextArea
                        value={this.state.content}
                        style={{ width: '100%', height: '100%' }} onChange={(e) => {
                            this.setState({ content: e.target.value })
                        }} />
                </div>}
                <div style={{ padding: 15 }}>
                    <ReactMarkdown escapeHtml={false} source={this.state.content} />
                </div>
            </WidgetTextStyled>
        );
    }
};

