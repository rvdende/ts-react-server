
import * as path from "path"
import * as http from "http"
import { SocketServer } from "./socket";
import { webpackConfig } from './webpack.config'
import { readFile, writeFile } from 'fs';

import express = require('express')
import mongojs = require('mongojs')
import { AnimationObjectGroup } from "three";

const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');

let port = 8080

// app.get('/', (req, res) => res.send('Hello World!'))



////////////////////////////////////////////////////////////////////
// DASHBOARD

export interface CloudAppResponse<T> {
    isSuccessful: boolean;
    message: string;
    data?: T;
    exceptionMessage?: string;
    status?: number;
}

export interface Config {
    mongodb: string
    httplistenport?: number
}

function startServer(db: mongojs.db) {

    const app = express();
    app.use(express.static(path.resolve(__dirname, '../../public')))
    app.use(express.static(path.resolve(__dirname, '../../build/client')))
    const compiler = webpack(webpackConfig);
    app.use(middleware(compiler, {}));
    app.use(require("webpack-hot-middleware")(compiler));
    app.use(express.json({ limit: '10mb' }));

    /// FLOOR 3D people

    app.post('/nodeapi/scenedata', (req, res) => {
        wss.send(JSON.stringify({ type: 'scenedata', data: req.body }))
        res.json({ result: 'success' })
    })

    ///

    app.post('/nodeapi/prototype/data/post', (req, res) => {
        wss.send(JSON.stringify(req.body));
        res.json({ result: 'success' })
    })

    app.post('/nodeapi/prototype/state/:key', (req, res) => {
        db.states.findOne({ key: req.params.key }, (err, state) => {
            if (state !== null) {
                res.json({
                    isSuccessful: false,
                    message: 'state with this key already exists',
                    data: state
                })
            } else {
                const initstate: any = {
                    key: req.params.key,
                    data: req.body,
                    widgets: [],
                    layouts: { xxl: [], xl: [], lg: [], md: [], sm: [], xs: [], xxs: [] }
                }
                db.states.save(initstate, (errsave, result) => {
                    res.json({ isSuccessful: true, message: 'state has been saved', data: initstate });
                });
            }
        });
    })

    app.post('/nodeapi/prototype/statebykey', (req, res) => {
        console.log(req.body);

        db.states.findOne({ key: req.body.key }, (err, state) => {

            if (state === null) {
                const initstate: any = {
                    key: req.body.key,
                    data: { test: 42 },
                    widgets: [],
                    layouts: { xxl: [], xl: [], lg: [], md: [], sm: [], xs: [], xxs: [] }
                }
                db.states.save(initstate, (e, r) => {
                    res.json({ isSuccessful: true, message: 'init', data: initstate })
                })

            }

            if (state) {
                res.json({ isSuccessful: true, message: 'found state', data: state })
            }
        })
    })

    app.post('/nodeapi/prototype/statefind', (req, res) => {
        db.states.find(req.body.query, (err, result) => {
            if (result) {
                res.json({ isSuccessful: true, message: 'state found', data: result });
            } else {
                res.json({ isSuccessful: false, message: 'error', data: err });
            }
        })
    })

    app.post('/nodeapi/prototype/stateupdate', (req, res) => {
        // console.log(req.body);

        if (!req.body.query) { res.json({ isSuccessful: false, message: 'stateupdate requires a query parameter' }); return; }
        if (!req.body.update) { res.json({ isSuccessful: false, message: 'stateupdate requires an update parameter' }); return; }


        db.states.update(req.body.query, req.body.update, { upsert: 1 }, (err, result) => {
            if (err) {
                res.json({ isSuccessful: false, message: 'state could not be updated', data: err })
                return;
            }
            if (result) {
                if (result.data === undefined) { result.data = {} }
                res.json({ isSuccessful: true, message: 'state has been updated', data: result })
            }
        })

    })

    ///////////////////////////////////////////////

    app.get('/nodeapi/prototype/import', (req, res) => {
        loaddb(db, (success) => {
            res.json(success)
        }, (err) => {
            res.status(500).json(err);
        })
        // db.states.find({},(err,states)=>{
        //     writeFile('src/dbstatesexport.ts','let data = '+JSON.stringify(states,null,2),(err)=>{
        //         if (err) {console.error(err); return;}
        //         console.log('file exported.');
        //     })
        // })
    })

    app.get('/nodeapi/prototype/export', (req, res) => {
        db.states.find({}, (err, states) => {

            if (err) {
                const msg: CloudAppResponse<any> = {
                    isSuccessful: false,
                    message: 'error exporting db',
                    data: err
                }
                res.status(500).json(msg)
            }

            // we generate a .ts file here we can import
            writeFile('src/dbstatesexport.ts', 'export const data : any = ' + JSON.stringify(states, null, 2),
                (errWrite) => {
                    if (errWrite) { console.error(err); return; }
                    console.log('file exported.');
                    const msg: CloudAppResponse<any> = { isSuccessful: true, message: 'exported db' }
                    res.json(msg)
                })
        })
    })

    ///////////////////////////////////////////////////////////


    //////////////////////////////////////////////////////////////////////


    // Handles any requests that don't match the ones above
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '../../../public/index.html'));
    });

    var serverhttp = http.createServer(app);
    var wss = new SocketServer(serverhttp);

    serverhttp.listen(port, () => console.log(`ts-react-server listening on port http://localhost:${port}/ !`))
}

function connectDb(config: Config) {
    const db: any = mongojs(config.mongodb, ['users', 'tickets', 'config'])
    db.testconnection.find({}, (Err: Error, results: any) => { })
    db.on('error', (err: Error) => { console.error(err) })
    db.on('connect', () => {
        startServer(db);
    })
}

function main() {
    // MAIN ENTRY TO PROGRAM STARTS HERE
    readFile(path.join(__dirname, '../../config.json'), (err, configRaw) => {
        if (err) {
            console.log("No config.json found. Using defaults.")
            connectDb({ mongodb: 'tsserver' });
        } else {
            const config: Config = JSON.parse(configRaw.toString());
            if (config.httplistenport) port = config.httplistenport
            connectDb(config);
        }
    });
}



export function initializestate(db: any) {
    db.states.find({}, (error: Error, states: any) => {
        if (states.length === 0) {
            loaddb(db,
                (success) => { console.log('loaded default state to db.') },
                (err) => { console.error(err) });
        }
    })
}

export function loaddb(db: any,
    success?: (response: CloudAppResponse<any>) => void,
    error?: (response: CloudAppResponse<any>) => void
) {
    import('../dbstatesexport').then(imported => {
        db.states.remove({}, (err: Error) => {

            if (err) {
                let a = { isSuccessful: false, message: 'error importing db file', data: err };
                console.log(a);
                return;
            }

            const bulk = db.states.initializeOrderedBulkOp();
            for (const entry of imported.data) { bulk.insert(entry); }
            bulk.execute(() => {
                success({ isSuccessful: true, message: 'db file loaded' })
            })
        })
    })
}

main();