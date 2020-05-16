import React, { Component } from 'react';
import { OptionMaster } from './optionmaster'
import { Checkbox } from '../checkbox';



export default class OptionsBoolean extends OptionMaster {
  state = { val: false }

  constructor(props: any) {
    super(props);

    let value = false // default
    if (props) {
      if (props.option) {
        if (props.option.default !== undefined) { value = props.option.default }
        if (props.option.val !== undefined) { value = this.props.option.val }
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
    this.setState({ val: !this.state.val }, () => {
      this.apply();
    });
  }

  render() {
    return (<div className='widgetMenuItem'>

      <div className='row'>
        <div className='col-4'>
          {this.props.name}:
        </div>
        <div className='col-8'>
          <Checkbox checked={this.state.val} onChange={this.onChange} />
        </div>
      </div>
    </div>)
  }
}