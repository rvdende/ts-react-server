import React, { Component } from 'react';
import { OptionMaster } from './optionmaster'
import { Input } from '../input';
import { Button } from '../button';



export default class OptionsInput extends OptionMaster {
  state = { val: 'default1' }

  constructor(props: any) {
    super(props);

    let value = 'default2' // default
    if (props) {
      if (props.option) {
        if (props.option.default !== undefined) { value = props.option.default }
        if (props.option.val !== undefined) { value = this.props.option.val }
      }
    }

    this.state.val = value;
  }

  input: any;

  onKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      this.apply();
      this.input.focus();
    }
  }

  onChange = (event: any) => {
    this.setState({ val: event.target.value }, () => {
      this.apply();
      this.input.focus();
    });
  }

  render() {
    return (<>
      {this.props.name}:<br />
      <div>
        <Input
          onMouseOver={() => { this.input.focus() }}
          ref={(el) => this.input = el}
          style={{ width: '100%' }}
          type='text'
          value={this.state.val}
          onKeyPress={this.onKeyPress}
          onChange={this.onChange} >
        </Input>
      </div>
    </>)
  }
}