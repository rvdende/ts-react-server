import * as express from "express"
import * as path from "path"
import * as http from "http"
import { SocketServer } from "./socket";
import { webpackConfig } from './webpack.config'

const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');

var expressapp: any = express;

const app: express.Application = expressapp();
const port = 8080

// app.get('/', (req, res) => res.send('Hello World!'))

app.use(express.static(path.resolve(__dirname, '../../public')))
app.use(express.static(path.resolve(__dirname, '../../build/client')))

const compiler = webpack(webpackConfig);

app.use(middleware(compiler, {}));
app.use(require("webpack-hot-middleware")(compiler));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../../../public/index.html'));
});

var serverhttp = http.createServer(app);

var wss = new SocketServer(serverhttp);

serverhttp.listen(port, () => console.log(`ts-react-server listening on port http://localhost:${port}/ !`))