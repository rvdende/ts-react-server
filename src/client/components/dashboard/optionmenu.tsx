import React from 'react';
import * as optionsComponentsImport from './options'
import styled from 'styled-components';
import { Button } from './button';
import { Select } from './select';
import { WidgetType, CorePacket } from './interfaces';

export function recursiveFlat(inObj: any) {
    const res: any = [];

    (function recurse(obj, current?: any) {

        if (Array.isArray(obj)) { return; }

        for (const key in obj) {
            if (key) {
                const value = obj[key];
                const newKey = current ? current + '.' + key : key; // joined key with dot
                if (value && typeof value === 'object') {
                    res.push(newKey);
                    recurse(value, newKey); // it's a nested object, so do it again
                } else {
                    res.push(newKey); // it's not an object, so set the property
                }
            }
        }
    })(inObj);

    return res;
}

interface MyState {
    [index: string]: any;
}

interface OptionMenuProps {
    /** array of the possible widgets to choose from */
    options: object[]
    action: (action: any) => void
    /** currently selected widget type: eg "guage" or "graph" */
    widgettypename: string
    widgettypes: string[]
    widget: WidgetType
    state: CorePacket
    style?: any
    menuOpenToLeft?: boolean
}

/** This builds the option menu */
export class OptionMenu extends React.Component<OptionMenuProps, MyState> {
    state: MyState = {
        options: [],
        datapath: '',
        /** if the user types in a new datapath we ignore datapath settings from parent object. */
        datapathEdit: false
    };

    static getDerivedStateFromProps(props: OptionMenuProps, state: MyState) {
        if (state.datapathEdit) {
            return null;
        } else {
            if (props.widget.datapath) {
                return { datapath: props.widget.datapath };
            } else {
                return null;
            }
        }

    }

    action = (optionName: string) => {
        return (data: any) => {
            const option: any = {}
            option[optionName] = data.apply;
            this.props.action({ option })
        }
    }

    render() {
        let options: any = [];

        if (this.props.options) {
            options = this.props.options;
        }

        if (this.props.widget) {

            if (this.props.widget.options) {
                Object.keys(this.props.widget.options).map((opt, i) => {
                    if (options[opt]) {
                        options[opt].val = this.props.widget.options[opt]
                    }
                })
            }
        }

        const WidgetMenu = styled.div`
            position: absolute;
            z-index: 100;
            width: auto;
            min-width: 500px;
            font-size: 14px;
            top: 0px;
            margin-left: 0px;
            background: ${({ theme }) => theme.bodyAlt};
            border-radius: ${({ theme }) => theme.radius};
            padding: 5px;
        `;

        return (<WidgetMenu style={(this.props.menuOpenToLeft)
            ? { right: 28, borderTopRightRadius: 0 }
            : { left: 0, borderTopLeftRadius: 0 }} >
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ flex: 1, paddingRight: 5 }}>
                    <Button
                        icon='fas fa-save'
                        text='SAVE'
                        style={{ width: '100%' }}
                        onClick={e => this.props.action({ save: true })} />
                </div>

                <div style={{ flex: 1, paddingLeft: 5 }}>
                    <Button
                        icon='fas fa-trash-alt'
                        text='DELETE'
                        style={{ width: '100%' }}
                        onClick={e => this.props.action({ remove: true })} />
                </div>
            </div>

            <div style={{ padding: 10 }}>
                <div>Widget type:</div>
                <div>
                    <Select
                        style={{ width: '100%' }}
                        value={this.props.widgettypename}
                        onChange={(e => this.props.action({ type: e.target.value }))}>
                        {this.props.widgettypes.map((widgettype, i) => {
                            if (widgettype !== '__esModule') return <option key={i}>{widgettype}</option>
                        })}
                    </Select>
                </div>
            </div>

            <div style={{ padding: 10 }}>
                <div>Data source: </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ flex: '1' }}>
                        <Select
                            style={{
                                width: '100%',
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0
                            }}
                            value={this.state.datapath}
                            onChange={(e) => {
                                this.setState({ datapath: e.target.value, datapathEdit: true }, () => {
                                    this.props.action({ datapath: this.state.datapath })
                                })
                            }}>
                            <option value=' '></option>
                            {recursiveFlat(this.props.state.data).map((item: any, i: string) => {
                                return <option value={'data.' + item} key={i}>{'data.' + item}</option>
                            })}
                            {/* {(Object.keys(this.props.state.data)).map((item, i) => {
                                return <option value={'data.' + item} key={i}>{'data.' + item}</option>
                            })} */}
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
                            onClick={() => {
                                this.setState({ datapath: ' ', datapathEdit: true }, () => {
                                    this.props.action({ datapath: this.state.datapath })
                                })
                            }} />
                    </div>
                </div>
            </div>



            {
                Object.keys(options).map((x, i) => {
                    const optionsComponents: any = optionsComponentsImport;
                    const OptionToDraw = optionsComponents[options[x].type.toLowerCase()]

                    if (!OptionToDraw) {
                        return <div style={{ padding: 20 }}>
                            Error {options[x].type.toLowerCase()}</div>
                    }

                    return <div style={{ padding: 10 }} key={i}>
                        <OptionToDraw
                            name={x}
                            option={options[x]}
                            action={this.action(x)}
                            datasourceoptions={recursiveFlat(this.props.state.data)}
                        />
                    </div>
                })
            }

        </WidgetMenu>)
    }
}
