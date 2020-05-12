import * as React from "react";
import styled, { css } from 'styled-components'

interface Props { somevalue?: string }

interface State { }

/* background: ${({ theme }) => theme.bgSpot}; */
const StyledDiv = styled.div`    
    padding: 15px;
    margin: 20px;
    border-radius: 25px;
`;

export class Example extends React.Component<Props, State> {
    state = {}

    static getDerivedStateFromProps(props: Props, state: State) {
        return props;
    }

    render() {
        return (
            <div>
                <StyledDiv>
                    Styled component
                    Example {(this.props.somevalue) && <span>{this.props.somevalue}</span>}
                </StyledDiv>
            </div>
        )
    }

}