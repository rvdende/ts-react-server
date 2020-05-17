import styled from 'styled-components';
import React from 'react';

import { SketchPicker, ColorChangeHandler } from 'react-color';

const SwatchWrap = styled.div`
  position: relative; 
`;

const SwatchButton = styled.div`
  width: 40px;
  height: 20px;
  border-radius: 3px;
  border: 2px solid rgba(125,125,125,0.5);

  :hover {
      cursor: pointer;
      border: 2px solid rgba(125,125,125,0.75);
    }
`;

const PopUp = styled.div`
  position: absolute;
  top: -15px;
  z-index: 1000;
  left: 45px;
`;

const Outside = styled.div`
position: fixed;
left:0;
top:0;
right:0;
bottom:0;
width: 100%;
height: 100%;
z-index: -1000;
`;
export class InputColor extends React.Component<{ value: string, onChange: (e: any) => void, [index: string]: any }, {}> {
  state = { active: false }



  render() {
    return (
      <SwatchWrap >

        <SwatchButton style={{ background: this.props.value }} onClick={(e) => { this.setState({ active: !this.state.active }) }} />
        {(this.state.active) && <PopUp>
          <Outside onClick={() => { this.setState({ active: false }) }} />
          <SketchPicker color={this.props.value} onChange={(color) => {
            // this.props.onChange({ target: { value: color.hex } });
            let rgba = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
            this.props.onChange({ target: { value: rgba } });
          }} />

        </PopUp>}

      </SwatchWrap>)
  }
}