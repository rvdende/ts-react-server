

/**
 * LINKS:
 * https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/express-serve-static-core/index.d.ts
 */
declare module 'express' {

    import * as http from 'http';

    function e(): Express;

    interface Express extends Application {
        request: Request;
        response: Response;
    }

    type RR = (request: Request, response: Response) => void;
    type RRN = (request: Request, response: Response, next: Next) => void;
    type ERRN = (error: Error, request: Request, response: Response, next: Next) => void;
    type Response = any;
    type Next = () => void;

    interface Request {
        [key: string]: any;
    }

    interface Application {
        /**
         * Express instance itself is a request handler, which could be invoked without
         * third argument.
         */
        (req: Request | http.IncomingMessage, res: Response | http.ServerResponse): any;

        use(a: RRN): void;
        use(a: ERRN): void;
        use(path: string, a: RRN): void;
        get(path: string, cb: RR): void;
        post(path: string, cb: RR): void;
        put(path: string, cb: RR): void;
        delete(path: string, cb: RR): void;
        patch(path: string, cb: RR): void;
        /**
            * Listen for connections.
            *
            * A node `http.Server` is returned, with this
            * application (which is a `Function`) as its
            * callback. If you wish to create both an HTTP
            * and HTTPS server you may do so with the "http"
            * and "https" modules as shown here:
            *
            *    var http = require('http')
            *      , https = require('https')
            *      , express = require('express')
            *      , app = express();
            *
            *    http.createServer(app).listen(80);
            *    https.createServer({ ... }, app).listen(443);
            */
        listen(port: number, hostname: string, backlog: number, callback?: (...args: any[]) => void): http.Server;
        listen(port: number, hostname: string, callback?: (...args: any[]) => void): http.Server;
        listen(port: number, callback?: (...args: any[]) => void): http.Server;
        listen(callback?: (...args: any[]) => void): http.Server;
        listen(path: string, callback?: (...args: any[]) => void): http.Server;
        listen(handle: any, listeningListener?: () => void): http.Server;
    }

    // function Application(): 

    namespace e {
        var json: any;
        var static: any;
    }

    export = e;
}

