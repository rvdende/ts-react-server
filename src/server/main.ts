import * as express from "express"
import { User } from "../shared/interfaces"
import * as path from "path"
import * as http from "http"
import { SocketServer } from "./socket";

var expressapp: any = express;

const app: express.Application = expressapp();
const port = 8080

app.use(express.static(path.resolve(__dirname, '../../public')))
app.use(express.static(path.resolve(__dirname, '../../build/client')))
//app.get('/', (req, res) => res.send('Hello World!'))

var serverhttp = http.createServer(app);

// used for live update
var wss = new SocketServer(serverhttp);

serverhttp.listen(port, () => console.log(`Example app listening on port ${port}!`))