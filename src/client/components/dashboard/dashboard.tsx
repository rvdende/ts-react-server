import * as React from 'react';
import { dashboardService } from './dashboardService';
import { Responsive, WidthProvider, Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css'
import Widget from './widget'
import { WidgetOption } from './widgets/widgetcomponent';

import { Button } from './button';
import styled from 'styled-components';

import * as lodash from 'lodash'
import {
    DashboardState,
    DashboardLayouts,
    DashWidgetLayout,
    WidgetType,
    WidgetAction
} from './interfaces';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export function clone(obj: any) {
    return JSON.parse(JSON.stringify(obj));
}

export function generateDifficult(count: number) {
    const _sym = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
    let str = '';
    for (let i = 0; i < count; i++) {
        const tmp = _sym[Math.round(Math.random() * (_sym.length - 1))];
        str += '' + tmp;
    }
    return str;
}



// tslint:disable-next-line: no-empty-interface
interface Props {
    state: DashboardState,
    editMode?: boolean
}

interface State {
    currentBreakpoint: string,
    compactType: any,
    mounted: boolean,
    layouts?: DashboardLayouts,
    editMode: boolean
    state: DashboardState,
    widgetGrabClassName: string
    loadOld: boolean
    importButton: string
    exportButton: string
    counter: number
}

const DashboardAdminBar = styled.div`
    display: flex;
    flex-direction: row;
    background: ${({ theme }) => theme.bodyAlt};
    color: ${({ theme }) => theme.text};
    margin-bottom: 0px;
    margin-right: 0px;
`;


const DashboardWrapper = styled.div`
    margin: 0 auto;
    height: 100%;
    overflow: visible;
    width: 100%;

    .react-grid-item.react-grid-placeholder {
        background: black;
        opacity: 0.05;
        border-radius: ${({ theme }) => theme.radius};
    }

    .react-resizable-handle-se {
        z-index: 90;
        width: 4px;
        height: 4px;
        background-image: none;
        border-bottom: 2px dashed ${({ theme }) => theme.focusColor};
        border-right: 2px dashed ${({ theme }) => theme.focusColor};
        opacity: 0.25;
        transition: opacity 0.2s linear;
    }

    .react-resizable-handle-se:hover {
        opacity: 0.5;
    }

    .react-resizable-handle::after {
        display: none;
    }
`;

type layoutNamesType = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | 'xxs';


class Dashboard extends React.Component<Props, State> {

    constructor(props: any) {
        super(props)
        this.state = {
            currentBreakpoint: 'lg',
            compactType: 'vertical',
            mounted: false,
            editMode: (props.editMode) ? props.editMode : false,
            state: this.props.state,
            widgetGrabClassName: 'grabUnique' + generateDifficult(8),
            loadOld: false,
            importButton: undefined,
            exportButton: undefined,
            counter: 0
        }

        dashboardService.on('editMode', this.handleEditMode);
    }


    options = {
        className: 'layout',
        rowHeight: 100,
        onLayoutChange() { },
        cols: { xxl: 31, xl: 20, lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
        breakpoints: { xxl: 3000, xl: 2000, lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }
    }

    layoutNames: layoutNamesType[] = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']
    updatesource = 'props';
    settingLayout = false;
    draggingUnique = '';
    lastlayoutdata: any = [];
    lastwidth = 0;

    componentWillUnmount = () => {
        dashboardService.removeListener('editMode', this.handleEditMode);
    }

    handleEditMode = (editMode: boolean) => {
        this.setState({ editMode });
    }

    onBreakpointChange = (breakpoint: layoutNamesType) => {
        const state = clone(this.state.state);
        for (const wid of state.widgets) {

            if (!state.layouts[breakpoint]) { state.layouts[breakpoint] = [] }

            const check = state.layouts[breakpoint].filter((w: DashWidgetLayout) => (w.i === wid.i))
            if (check.length === 0) {
                let widgetLayoutsFound = [];
                for (const size of this.layoutNames) {
                    if (state.layouts[size]) {
                        widgetLayoutsFound = state.layouts[size].filter((wi: DashWidgetLayout) => (wi.i === wid.i));
                    }

                    if (widgetLayoutsFound.length === 1) { break; }
                }

                if (widgetLayoutsFound.length === 1) {

                    const newWidgetLayout = clone(widgetLayoutsFound[0]);
                    // cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }
                    if (newWidgetLayout.w > this.options.cols[breakpoint]) {
                        newWidgetLayout.w = this.options.cols[breakpoint];
                    }

                    if ((newWidgetLayout.w / this.options.cols[breakpoint]) >= 0.75) {
                        newWidgetLayout.w = this.options.cols[breakpoint];
                    }

                    state.layouts[breakpoint].push(newWidgetLayout)
                }
            }
        }


        this.setState({
            currentBreakpoint: breakpoint,
            state
        });
    };

    saveLayout = () => { this.updateServer(); }

    updateServer = () => {
        // do not update server if you are not in editMode
        if (!this.state.editMode) { return; }

        dashboardService.stateupdate({
            query: { key: this.props.state.key },
            update: {
                $set: {
                    widgets: this.state.state.widgets,
                    layouts: this.state.state.layouts
                }
            }
        },
            (success) => {
                console.log('updateServer', success);
            },
            (error) => {
                console.log(error);
            })
    }

    handleWidgetActions = (widget: WidgetType) => {
        return (action: WidgetAction) => {
            if (action.remove) { this.removeWidget(widget) }
            if (action.datapath) { this.changeWidgetDatapath(widget, action.datapath) }
            if (action.type) { this.changeWidgetType(widget, action.type) }
            if (action.option) { this.changeWidgetOption(widget, action.option); }
            if (action.save) { this.updatesource = 'user'; this.updateServer() }
        }
    }

    /** sets a widget option non permanently */
    changeWidgetOption(widget: { i: string }, option: WidgetOption) {
        const state = clone(this.state.state);
        state.widgets = state.widgets.map((w: WidgetType) => {
            if (w.i === widget.i) {
                if (!w.options) { w.options = option; } else {
                    w.options = { ...w.options, ...option }
                }
            }
            return w
        })
        this.setState({ state })
    }

    /** change the type of a widget */
    changeWidgetDatapath(widget: { i: string }, datapath: string) {
        dashboardService.stateupdate({
            query: { key: this.props.state.key, 'widgets.i': widget.i },
            update: { $set: { 'widgets.$.datapath': datapath } }
        }, (success) => {

            if (success.data.nModified === 1) {
                /** successfully changed in db */
                // - - - -
                const state = clone(this.state.state);

                for (const w of state.widgets) { if (w.i === widget.i) { w.datapath = datapath } }
                this.setState({ state }, () => {
                    // this.updateServer();
                })
                // - - - -
            }
        }, (err) => {
            console.log(err);
        })
    }

    /** change the type of a widget */
    changeWidgetType(widget: { i: string }, type: string) {
        dashboardService.stateupdate({
            query: { key: this.props.state.key, 'widgets.i': widget.i },
            update: { $set: { 'widgets.$.type': type } }
        }, (result) => {
            if (result.data.nModified === 1) {
                /** successfully changed in db */                    // - - - -
                const state = this.state.state;
                for (const w of state.widgets) { if (w.i === widget.i) { w.type = type } }
                this.setState({ state });
                // - - - -
            }
        }, (err) => { console.log(err); })
    }

    removeWidget(widget: { i: string }) {
        console.log('removeWidget', widget);
        dashboardService.stateupdate({
            query: { key: this.props.state.key },
            update: {
                $pull: {
                    widgets: { i: widget.i },
                    'layouts.xxl': { i: widget.i },
                    'layouts.xl': { i: widget.i },
                    'layouts.lg': { i: widget.i },
                    'layouts.md': { i: widget.i },
                    'layouts.sm': { i: widget.i },
                    'layouts.xs': { i: widget.i },
                    'layouts.xxs': { i: widget.i }
                }
            }
        }, (result) => {
            if (result.data.nModified === 1) {
                /** successfully removed in db */
                // - - - -
                const state = clone(this.state.state);
                state.widgets = state.widgets.filter((w: WidgetType) => { return (w.i !== widget.i) })
                state.layouts.xxl = state.layouts.xxl.filter((w: DashWidgetLayout) => { return (w.i !== widget.i) })
                state.layouts.xl = state.layouts.xl.filter((w: DashWidgetLayout) => { return (w.i !== widget.i) })
                state.layouts.lg = state.layouts.lg.filter((w: DashWidgetLayout) => { return (w.i !== widget.i) })
                state.layouts.md = state.layouts.md.filter((w: DashWidgetLayout) => { return (w.i !== widget.i) })
                state.layouts.sm = state.layouts.sm.filter((w: DashWidgetLayout) => { return (w.i !== widget.i) })
                state.layouts.xs = state.layouts.xs.filter((w: DashWidgetLayout) => { return (w.i !== widget.i) })
                state.layouts.xxs = state.layouts.xxs.filter((w: DashWidgetLayout) => { return (w.i !== widget.i) })
                this.setState({ state })
                // - - - -
            }

        }, (e) => { console.log(e); })
    }

    addWidget = () => {
        const state = clone(this.state.state);

        const widget = {
            i: generateDifficult(32), x: 0, y: 500, w: 1, h: 1,
            type: 'basic', datapath: '', dataname: ''
        }

        if (!state.widgets) { state.widgets = [] }

        state.widgets.push(widget)

        if (!state.layouts) { state.layouts = { xxl: [], xl: [], lg: [], md: [], sm: [], xs: [], xxs: [] } }

        // for (const size of Object.keys(state.layouts)) {
        //     state.layouts[size].push(widget);
        // }

        state.layouts[this.state.currentBreakpoint].push(widget);

        this.setState({ state }, () => {
            this.updateServer();
        });
    }

    onResizeStop = (item: any) => {
        console.log('dashboard onResizeStop', item)
        const state = clone(this.state.state);
        // const layoutNames = ['lg', 'md', 'sm', 'xs', 'xxs'];
        const ln = this.state.currentBreakpoint;
        const existingLayout = (state.layouts[ln]) ? state.layouts[ln] : [];
        state.layouts[ln] = lodash.values(lodash.merge(lodash.keyBy(existingLayout, 'i'), lodash.keyBy(item, 'i')));

        this.setState({ state }, () => {
            console.log(this.state.state.layouts)
            this.updateServer();
        });
    }

    onDrop = (elemParams: { x: number, y: number, w: number, h: number, e: Event }) => {
        console.log('onDrop', elemParams)
    }

    onDragStop = (item: any) => {
        console.log('onDragStop', item);
        const state = clone(this.state.state);
        const ln = this.state.currentBreakpoint;
        const existingLayout = (state.layouts[ln]) ? state.layouts[ln] : [];
        state.layouts[ln] = lodash.values(lodash.merge(lodash.keyBy(existingLayout, 'i'), lodash.keyBy(item, 'i')));
        this.setState({ state }, () => {
            console.log(this.state.state.layouts)
            this.updateServer();
        });
    }

    render() {

        let widgets: WidgetType[] = [];
        let layouts: any = {};

        if (this.state.state) {
            if (this.state.state.layouts) {
                layouts = this.state.state.layouts;
            }

            if (this.state.state.widgets) {
                widgets = this.state.state.widgets;
            }
        }



        for (const layoutbpname of this.layoutNames) {
            if (!layouts[layoutbpname]) { layouts[layoutbpname] = []; }
        }


        return (
            <DashboardWrapper ref={(el) => {
                if (el) {
                    if (el.offsetWidth !== this.lastwidth) {
                        this.lastwidth = el.offsetWidth;
                        window.dispatchEvent(new Event('resize'));
                    }
                }

            }}>
                {<div>
                    {(this.state.editMode) &&
                        <DashboardAdminBar>
                            <div style={{ flex: '1', padding: '20px 0 0 12px', opacity: 0.5 }}>
                                layout: {this.props.state.key} size: {this.state.currentBreakpoint}
                            </div>

                            <div style={{ padding: 5 }}>
                                <Button
                                    icon='fas fa-plus-square'
                                    onClick={() => { this.addWidget(); }} /></div>


                            <div style={{ padding: 5 }}>
                                <Button style={{ color: this.state.importButton }} icon='fas fa-upload' onClick={() => {
                                    dashboardService.importDashboards((success) => {
                                        this.setState({ importButton: 'lime' })
                                        setTimeout(() => { this.setState({ importButton: undefined }) }, 3000);
                                    }, (error) => {
                                        this.setState({ importButton: 'red' })
                                        setTimeout(() => { this.setState({ importButton: undefined }) }, 3000);
                                    });
                                }} /></div>

                            <div style={{ padding: 5 }}>
                                <Button style={{ color: this.state.exportButton }} icon='fas fa-download' onClick={() => {
                                    dashboardService.exportDashboards((success) => {
                                        this.setState({ exportButton: 'lime' });
                                        setTimeout(() => { this.setState({ exportButton: undefined }) }, 3000);
                                    }, (error) => {
                                        this.setState({ exportButton: 'red' });
                                        setTimeout(() => { this.setState({ exportButton: undefined }) }, 3000);
                                    });
                                }} /></div>

                            <div style={{ padding: 5, paddingRight: 20 }}>
                                <Button icon='fas fa-check' onClick={() => {
                                    this.saveLayout();
                                    this.setState({ editMode: false })
                                }} /></div>

                        </DashboardAdminBar>
                    }


                    {/* <Terminal>{JSON.stringify(this.state,null,2)}</Terminal> */}
                    <ResponsiveReactGridLayout
                        {...this.options}
                        onLayoutChange={(layout) => { }}
                        layouts={layouts}
                        onBreakpointChange={this.onBreakpointChange}
                        measureBeforeMount={false}
                        onResizeStop={this.onResizeStop}
                        useCSSTransforms={this.state.mounted}
                        verticalCompact={true}
                        compactType={this.state.compactType}
                        preventCollision={!this.state.compactType}
                        draggableHandle={'.' + this.state.widgetGrabClassName}
                        isResizable={this.state.editMode}
                        onDrop={this.onDrop}
                        onDragStop={this.onDragStop}
                    >
                        {/* {this.generateDOM()} */}
                        {widgets.map((widget, i) => {
                            return (<div key={widget.i} onDrag={e => { e.preventDefault(); e.stopPropagation(); }}>
                                <Widget
                                    widgetGrabClassName={this.state.widgetGrabClassName}
                                    edit={this.state.editMode}
                                    widget={widget}
                                    state={this.props.state}
                                    action={this.handleWidgetActions(widget)} />
                            </div>)
                        })}</ResponsiveReactGridLayout>
                </div>}
                {/* <Terminal style={{color:'lime',background:'black'}}>{JSON.stringify(this.state,null,2)}</Terminal> */}
            </DashboardWrapper>

        )
    };
}


export default Dashboard