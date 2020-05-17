import * as React from 'react';
import styled, { css } from 'styled-components'

// import { Redirect } from 'react-router-dom';
import history from '../../utils/history'

interface Props {
  text?: string,
  icon?: string,
  spot?: boolean,
  altStyle?: boolean;
  altLighter?: boolean;
  onClick?: (e?: any) => void;
  style?: any
  disabled?: boolean
  className?: string
  roundimg?: string
  to?: string        // router link
  href?: string      // hard link
  history?: any;
}

interface ButtonStyleProps {
  spot?: boolean;
  altStyle?: boolean;
  altLighter?: boolean;
}

const ButtonStyled = styled.button<ButtonStyleProps>`
  background: ${({ theme }) => theme.body};
  border-radius: ${({ theme }) => theme.radius};
  margin: 0px;
  padding: ${({ theme }) => theme.padding} ${({ theme }) => parseInt(theme.padding, 10) * 2};
  font-size: 15px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  white-space: nowrap;
  transition: all 0.15s linear;
  border: 2px solid ${({ theme }) => theme.inputBorder};
  outline:0;
  display: flex;
  flex-direction: row;

  ${props => props.spot && css`
    color: ${({ theme }) => theme.focusColor};
    background: ${({ theme }) => theme.brandSpot};
  `};

  ${props => props.altStyle && css`
    color: ${({ theme }) => theme.focusColor};
    background: ${({ theme }) => theme.bodyAlt};
  `};

  ${props => props.altLighter && css`
    color: ${({ theme }) => theme.focusColor};
    background: ${({ theme }) => theme.bodyAltLighter};
  `};

  :hover  {
    color: ${({ theme }) => theme.body};
    background: ${({ theme }) => theme.focusColor};
    cursor: pointer;
  }

  :focus {
      outline:0;
      border: 2px solid  ${({ theme }) => theme.focusColor};
      color: 2px solid  ${({ theme }) => theme.focusColor};
  }

  div.roundimg {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
    }

  div.buttonText {
    flex:1;
      padding: ${({ theme }) => theme.padding};
  }
`


interface State { text: string, link: boolean }

export class Button extends React.Component<Props, State> {
  state = {
    text: 'Default',
    link: false
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    return props;
  }

  render() {

    //   if (this.state.link && this.props.to) {
    //     return <Redirect to={this.props.to} />
    // }

    let className = 'button';
    if (this.props.className) { className += ' ' + this.props.className }
    return (
      <ButtonStyled style={(this.props.style)}
        onClick={(e) => {
          if (this.props.onClick) this.props.onClick(e);
          if (this.props.to) {
            // this.setState({ link: true }, () => {
            //     if (this.props.onClick) this.props.onClick(e);
            // });
            history.push(this.props.to);
            return;
          }

          if (this.props.href) window.location.replace(this.props.href);


        }}
        className={className}
        altStyle={this.props.altStyle}
        altLighter={this.props.altLighter}
        spot={this.props.spot}>

        {(this.props.roundimg) && <div className='roundimg'>
          <img src={this.props.roundimg} style={{ width: '100%' }} />
        </div>}

        <div className='buttonText'>
          <i className={'' + (this.props.icon) ? this.props.icon : ''} /> {this.props.children} {this.props.text}
        </div>

      </ButtonStyled>
    )
  }

}

// https://polished.js.org/docs/

