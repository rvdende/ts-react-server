export interface User {
    name: string
}


export interface CorePacket {
    id?: string;
    data?: any;
    apikey?: string;
    alarm?: boolean;
    warning?: boolean;
    shared?: boolean;
    public?: boolean;
    workflowCode?: string;
    key?: string; // todo: is this secret?
    [index: string]: any;
    timestamp?: Date | string;
    layout?: any
}


export interface DashboardState {
    key?: string,
    data?: any,
    widgets?: WidgetType[]
    layouts?: DashboardLayouts
}

export interface DashboardLayouts {
    xxl?: DashWidgetLayout[],
    xl?: DashWidgetLayout[],
    lg?: DashWidgetLayout[],
    md?: DashWidgetLayout[],
    sm?: DashWidgetLayout[],
    xs?: DashWidgetLayout[],
    xxs?: DashWidgetLayout[]
}

export interface WidgetAction {
    remove?: any
    datapath?: any
    type?: any
    option?: any
    save?: any
}

export interface DashWidgetLayout {
    type: string;
    i?: string;
    x?: number;
    y?: number;
    w?: number;
    h?: number;
    datapath: string
    dataname: string
}

export interface WidgetType {
    type: string;
    i: string;
    x?: number;
    y?: number;
    w?: number;
    h?: number;
    /**
     *
     * dot.notation.path.to.nested.data
     *
     *
     * This specific widget may have a datapath assigned to it.      *
     * Usually this is set when you drag and drop an object from the device data panel.
     *
     * eg: root.id
     *
     *      root.data.temperature
     *
     * */
    datapath?: string;
    dataname: string;
    /** If any options have been set on this widget */
    options?: any;
}