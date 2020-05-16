import * as React from 'react';
import styled, { css } from 'styled-components'

// tslint:disable-next-line: no-empty-interface
interface Props { checked: boolean, onChange: (e?: any) => void }

// tslint:disable-next-line: no-empty-interface
interface State { }

export const CheckboxContainer = styled.div`
    position: relative;
    padding-left: 35px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 25px;
    height: 25px;

    input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    input:checked ~ .checkmark {
        background-color: ${({ theme }) => theme.brandSpot};
        transition: all 0.2s linear;
        border: 2px solid ${({ theme }) => theme.brandSpot};
    }


    input:focus ~ .checkmark {
        border: 2px solid ${({ theme }) => theme.focusColor};
    }

    span {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: ${({ theme }) => theme.bodyAltLighter};
        border: 2px solid ${({ theme }) => theme.body};
        border-radius: 4px;
    }

    .checkmark:after {
        content: '';
        position: absolute;
        display: none;
    }

    input:checked ~ .checkmark:after {
        display: block;
    }

    .checkmark:after {
        left: 7px;
        top: 3px;
        width: 7px;
        height: 12px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    :hover input ~ .checkmark {
        background: ${({ theme }) => theme.bodyAltLighter};
        transition: all 0.2s linear;
        border: 2px solid ${({ theme }) => theme.brandSpot};
    }

    :hover input ~ .checkmark:after {
        left: 7px;
        top: 3px;
        width: 7px;
        height: 12px;
        transition: all 0.2s linear;
        border: 2px solid ${({ theme }) => theme.brandSpot};
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
`;



export class Checkbox extends React.Component<Props, State> {
    state = {}

    render() {
        return (
            <CheckboxContainer onClick={this.props.onChange}>
                <input
                    type='checkbox'
                    checked={this.props.checked}
                    onChange={() => { }} />
                <span className='checkmark' />
            </CheckboxContainer>
        )
    }

}

// https://polished.js.org/docs/

