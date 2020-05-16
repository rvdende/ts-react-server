import React, { Component } from 'react';
import { OptionMaster } from './optionmaster'
import { Input } from '../input';
import { Button } from '../button';



export default class OptionsNumber extends OptionMaster {
  state = { val: 20 }

  constructor(props: any) {
    super(props);

    let value = 20 // default
    if (props) {
      if (props.option) {
        if (props.option.default !== undefined) { value = props.option.default }
        if (props.option.val !== undefined) { value = this.props.option.val }
      }
    }

    this.state.val = parseFloat(value.toString());
  }

  onKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      this.apply();
    }
  }

  onChange = (event: any) => {
    this.setState({ val: parseFloat(event.target.value) }, () => {
      this.apply();
    });
  }

  addSubtract = (amount: number) => {
    this.setState({ val: parseFloat(this.state.val.toString()) + amount }, () => {
      this.apply();
    });
  }



  render() {
    return (<>
      {this.props.name}:<br />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Input
          style={{ width: '100%' }}
          type='number'
          value={this.state.val}
          onKeyPress={this.onKeyPress}
          onChange={this.onChange} >
        </Input>
        <Button
          onClick={() => { this.addSubtract(1) }}
          style={{ borderRadius: 0, marginLeft: 1, marginRight: 1 }}
          icon='fas fa-plus' />
        <Button
          onClick={() => { this.addSubtract(-1) }}
          style={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0
          }}
          icon='fas fa-minus' />
      </div>
    </>)
  }
}