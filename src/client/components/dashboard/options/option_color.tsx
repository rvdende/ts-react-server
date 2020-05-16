import React, { Component } from 'react';
import { OptionMaster } from './optionmaster'
import { Input } from '../input';
import { InputColor } from '../input_color';



export default class OptionsColor extends OptionMaster {
  state = { val: '#FFFFFF' }

  constructor(props: any) {
    super(props);

    let value = '#ff0000' // default
    if (props) {
      if (props.option) {
        if (props.option.default) { value = props.option.default }
        if (props.option.val) { value = this.props.option.val }
      }
    }

    this.state.val = value;
  }

  onKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      this.apply();
    }
  }

  onChange = (event: any) => {
    this.setState({ val: event.target.value }, () => {
      this.apply();
    });
  }

  render() {
    return (
      <div>
        <div style={{ padding: '10px 5px 10px 0px' }}>{this.props.name}</div>
        <div
          className='widgetMenuItem'
          style={{ display: 'flex', flexDirection: 'row' }} >
          <InputColor
            style={{
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              background: this.state.val,
              width: 40
            }}
            type='color'
            value={this.state.val}
            onChange={this.onChange} />
          <Input style={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0
          }} type='text' value={this.state.val} onChange={this.onChange} />
        </div></div>)
  }
}