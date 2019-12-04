import * as express from "express"
import { User } from "../shared/interfaces"
import * as path from "path"
import * as http from "http"
import { SocketServer } from "./socket";
import { fstat } from "fs";

var expressapp: any = express;

const app: express.Application = expressapp();
const port = 8080

app.use(express.static(path.resolve(__dirname, '../../public')))
app.use(express.static(path.resolve(__dirname, '../../build/client')))
//app.get('/', (req, res) => res.send('Hello World!'))

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../../../public/index.html'));
});

var serverhttp = http.createServer(app);

// used for live update
var wss = new SocketServer(serverhttp);

serverhttp.listen(port, () => console.log(`ts-react-server listening on port http://localhost:${port}/ !`))