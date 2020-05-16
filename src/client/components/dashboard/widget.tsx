import * as React from 'react';
import * as widgetsImport from './widgets'
import { OptionMenu } from './optionmenu'
import styled, { css } from 'styled-components';
import { WidgetType, CorePacket, WidgetAction } from './interfaces';

export function objectByString(obj: any, str: string) {

    str = str.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    str = str.replace(/^\./, '');           // strip a leading dot
    const a = str.split('.');
    for (let i = 0, n = a.length; i < n; ++i) {
        const k = a[i];
        if (k in obj) {
            obj = obj[k];
        } else {
            return;
        }
    }
    return obj;
}

interface MyProps {
    widgetGrabClassName: string
    widget: WidgetType;
    state: CorePacket;
    action: any;
    edit: boolean;
}

interface WidgetState {
    showMenu: boolean,
    error?: string
    menuOpenToLeft: boolean
}

interface WidgetWrapperProps {
    editable: boolean
}

const WidgetWrapper = styled.div<WidgetWrapperProps>`
    background: ${({ theme }) => theme.bodyAltLighter};
    height: 100%;
    position: 'relative';
    border-radius: ${({ theme }) => theme.radius};
    box-sizing: border-box;

    ${props => props.editable && css`
        border-bottom-right-radius: 0px;
  `};
`;

const WidgetContent = styled.div`
    box-sizing: border-box;
    padding: 1px;
    height: 100%;
    width: 100%;
`;

const WidgetTopBar = styled.div`
    box-sizing: border-box;
    position: absolute;
    top: 0;
    right: 0;
    left:0;
    height: 0px;

    div#row {
        display: flex;
        flex-direction: row;
        width: 100%;
        position: relative;
    }

    div.widgetGrab {
        margin-left: 4px;
        margin-top: 4px;
        width: 20px;
        height: 20px;
        background: ${({ theme }) => theme.bodyAlt};
        cursor: grab;
        padding: 5px;
        border-radius: ${({ theme }) => theme.radius};
        position: absolute;
        line-height: 10px;
        font-size: 10px;
        opacity: 0.25;
        transition: opacity 0.2s linear;
    }

    div.widgetGrab:hover { opacity: 1; }

    div.widgetOptions {
        margin-right: 4px;
        margin-top: 4px;
        width: 20px;
        height: 20px;
        background: ${({ theme }) => theme.bodyAlt};
        cursor: pointer;
        padding: 5px;
        border-radius:${({ theme }) => theme.radius};
        position: absolute;
        line-height: 10px;
        font-size: 10px;
        right: 0;
        opacity: 0.25;
        transition: opacity 0.2s linear;

    }



    div.widgetOptions:hover { opacity: 1; }

    div.widgetOptionsActive {
        padding-left: 7px;
        background: ${({ theme }) => theme.bodyAltLighter};
    }

    div.widgetOptionsBg {
        width: 28px;
        height:28px;
        right: 0;
        position: absolute;
        background: white;
        background: ${({ theme }) => theme.bodyAlt};
        border-radius: ${({ theme }) => theme.radius};
    }

    div.widgetOptionsMenuAnchor {
        width: 0px;
        height:20px;
        right: 0;
        position: absolute;
    }

    div#datapath {
        flex: 1;
        padding-left: 7px;
    }

    div#widgettype {
        flex: 1;
        text-align: right;
    }
`;

class Widget extends React.Component<MyProps, WidgetState> {
    state: WidgetState = {
        showMenu: false,
        error: undefined,
        menuOpenToLeft: false // if user opens menu close to right edge of screen set true.
    };

    /** pass action up to parent dashboard */
    handleActionMenu = (data: WidgetAction) => {

        if (data.save) {
            this.setState({ showMenu: false })
        }

        this.props.action(data);
    }

    componentDidCatch(error: Error, info: any) {
        this.setState({ error: error.message });
        console.log('WIDGET CATCH ERROR', error, info)
    }

    render() {
        if (!this.props.widget) { return <div>error</div> }
        if (!this.props.widget.type) { return <div>error1</div> }

        // tslint:disable-next-line
        const widgets: any = widgetsImport;
        const WidgetToDraw = widgets[this.props.widget.type.toLowerCase()]

        // Obtain OPTIONS from widget class
        let WidgetOptions = []
        if (WidgetToDraw) WidgetOptions = new WidgetToDraw().options()

        let value;
        let valueTimestamp;
        if (this.props.widget.datapath) {
            value = objectByString(this.props.state, this.props.widget.datapath)
            // get the timestamp for the main value for this widget
            if (this.props.state.timestamps) valueTimestamp = objectByString(this.props.state, 'timestamps.' + this.props.widget.datapath)
        }

        const styleoverrides: any = {}

        if (this.props.widget)
            if (this.props.widget.options)
                if (this.props.widget.options.transparent) styleoverrides.background = 'none';




        return (
            <WidgetWrapper editable={this.props.edit} style={styleoverrides} onDrag={e => {
                e.preventDefault();
                e.stopPropagation();
            }} >

                {(this.state.error)
                    ? <WidgetContent>
                        <div style={{ padding: 10 }}>
                            {this.props.widget.type.toLowerCase()} err: {this.state.error}
                        </div>
                    </WidgetContent>
                    : <WidgetContent>
                        {(WidgetToDraw !== undefined)
                            ? <div style={{ height: '100%' }}><WidgetToDraw
                                widget={this.props.widget}
                                state={this.props.state}
                                value={value}
                                valueTimestamp={valueTimestamp}
                            /></div>
                            : <div>Error {this.props.widget.type.toLowerCase()} widget not found</div>}
                    </WidgetContent>}


                {(this.props.edit) &&
                    <WidgetTopBar >
                        <div id='row' style={{ borderTopRightRadius: (this.state.showMenu) ? 0 : 15 }}  >

                            {(this.state.showMenu) && <div
                                className='widgetOptionsBg'
                                style={(this.state.menuOpenToLeft)
                                    ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }
                                    : { borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                            />}

                            <div className={'widgetGrab ' + this.props.widgetGrabClassName}>
                                <i className='fas fa-arrows-alt' />
                            </div>

                            <div
                                className={(this.state.showMenu)
                                    ? 'widgetOptions widgetOptionsActive'
                                    : 'widgetOptions'}
                                onClick={(e) => {
                                    this.setState({
                                        showMenu: !this.state.showMenu,
                                        menuOpenToLeft: ((window.innerWidth - e.clientX) < 255)
                                    });
                                }}>
                                {(this.state.showMenu)
                                    ? <i className='fas fa-caret-left' />
                                    : <i className='fas fa-wrench' />}
                            </div>

                            <div className='widgetOptionsMenuAnchor'>
                                {(this.state.showMenu) ? <OptionMenu
                                    menuOpenToLeft={this.state.menuOpenToLeft}
                                    options={WidgetOptions}
                                    action={this.handleActionMenu}
                                    widgettypename={this.props.widget.type.toLowerCase()}
                                    widgettypes={Object.keys(widgets).sort()}
                                    widget={this.props.widget}
                                    state={this.props.state} /> : <div></div>}
                            </div>
                        </div>
                    </WidgetTopBar>}

            </WidgetWrapper>)
    }
}


export default Widget;