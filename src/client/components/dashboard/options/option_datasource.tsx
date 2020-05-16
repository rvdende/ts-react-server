import React, { Component } from 'react';
import { OptionMaster } from './optionmaster'
import { Button } from '../button';
import { Select } from '../select';

export default class OptionsDatasource extends OptionMaster {
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
    return (<>
      {this.props.name}:<br />

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: '1' }}>
          <Select
            style={{
              width: '100%',
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0
            }}
            value={this.state.val}
            onChange={this.onChange}
          >
            <option value=' '></option>
            {this.props.datasourceoptions.map((item, i) => {
              return <option value={'data.' + item} key={i}>{'data.' + item}</option>
            })}
          </Select>
        </div>
        <div style={{ flex: '0' }}>
          <Button
            icon='fas fa-times'
            style={{
              marginLeft: 1,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0
            }}
            onClick={(event) => {
              this.setState({ val: event.target.value }, () => {
                this.apply();
              });
            }} />
        </div>
      </div>
    </>)
  }
}





