import { EventEmitter } from 'events';

export interface CloudAppResponse<T> {
    isSuccessful: boolean;
    message: string;
    data?: T;
    exceptionMessage?: string;
    status?: number;
}

class DashboardService extends EventEmitter {
    headers: any = { 'Content-Type': 'application/json' }


    getstate = (options: { key: string },
        success?: (response: CloudAppResponse<any>) => void,
        error?: (response: CloudAppResponse<any>) => void
    ) => {
        fetch('/nodeapi/prototype/statebykey', {
            method: 'post',
            headers: this.headers,
            body: JSON.stringify(options)
        }).then(res => res.json()).then(
            (json) => {
                // console.log(json);
                if (json.isSuccessful) {
                    if (success) success(json);
                } else {
                    if (error) error({
                        isSuccessful: false,
                        message: 'could not get state',
                        data: json
                    });
                    return;
                }
            }).catch(err => {
                error({ isSuccessful: false, message: err.message })
            });
    }

    getstateAsync(options: { key: string }) {
        return new Promise((
            success?: (response: CloudAppResponse<any>) => void,
            error?: (response: CloudAppResponse<any>) => void
        ) => {
            this.getstate(options, success, error);
        })
    }

    //////////////////////////////

    statefind = (options: any,
        success?: (response: CloudAppResponse<any>) => void,
        error?: (response: CloudAppResponse<any>) => void
    ) => {

        fetch('/nodeapi/prototype/statefind', {
            method: 'post',
            headers: this.headers,
            body: JSON.stringify(options)
        }).then(res => res.json()).then(
            (json) => {
                // console.log(json);
                if (json.isSuccessful) {
                    if (success) success(json);
                } else {
                    if (error) error({
                        isSuccessful: false,
                        message: 'could not post message',
                        data: json
                    });
                    return;
                }
            }).catch(err => {
                error({ isSuccessful: false, message: err.message })
            });

    }

    //////////////////////////////
    stateupdate = (options: any,
        success?: (response: CloudAppResponse<any>) => void,
        error?: (response: CloudAppResponse<any>) => void
    ) => {

        fetch('/nodeapi/prototype/stateupdate', {
            method: 'post',
            headers: this.headers,
            body: JSON.stringify(options)
        }).then(res => res.json()).then(
            (json) => {
                // console.log(json);
                if (json.isSuccessful) {
                    if (success) success(json);
                } else {
                    if (error) error({
                        isSuccessful: false,
                        message: 'could not post message',
                        data: json
                    });
                    return;
                }
            }).catch(err => {
                error({ isSuccessful: false, message: err.message })
            });

    }
    /////////////////////////////////////////

    importDashboards = (
        success?: (response: CloudAppResponse<any>) => void,
        error?: (response: CloudAppResponse<any>) => void
    ) => {

        fetch('/nodeapi/prototype/import', {
            method: 'get',
            headers: this.headers
        }).then(res => res.json()).then(
            (json) => {
                console.log(json);

                if (json.isSuccessful) {
                    if (success) success(json);
                } else {

                    return;
                }
            }).catch(err => {
                error({ isSuccessful: false, message: err.message })
            });

    }

    exportDashboards = (
        success?: (response: CloudAppResponse<any>) => void,
        error?: (response: CloudAppResponse<any>) => void
    ) => {

        fetch('/nodeapi/prototype/export', {
            method: 'get',
            headers: this.headers
        }).then(res => res.json()).then(
            (json) => {
                // console.log(json);
                if (json.isSuccessful) {
                    if (success) success(json);
                } else {
                    if (error) error({
                        isSuccessful: false,
                        message: 'could not post message',
                        data: json
                    });
                    return;
                }
            }).catch(err => {
                error({ isSuccessful: false, message: err.message })
            });

    }

    /////////////////////////////////////////

}

const apiinstance = new DashboardService()

// const globalAny: any = global;
// globalAny.api = apiinstance

export const dashboardService = apiinstance