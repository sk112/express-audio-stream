import express from 'express';
import { createServer } from 'http'
import { Server } from "socket.io"
import cors from 'cors';
import { Authenticate } from './../src/middlewares/auth.js'
import { SocketAuthMiddleware } from './lib/auth.js';
import { createSocket } from './lib/socket.js';

const app = express();

const httpServer = createServer(app);
createSocket(httpServer)

app.use(cors())
app.use(Authenticate)
app.get('/', (req, res) => {
    console.log('Index....')
    res.send('Hello World!!')
})

httpServer.listen(3001);
