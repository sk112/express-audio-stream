import express from 'express';
import { createServer } from 'http'
import { Server } from "socket.io"
import cors from 'cors';
import { Authenticate } from './../src/middlewares/auth.js'
import { SocketAuthMiddleware } from './lib/auth.js';

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["*"],
        credentials: true
    }
});

io.use(SocketAuthMiddleware)
io.on('connection', socket => {

    socket.on('join-room', (userId) => {
        console.log('room joiin...')
    })

    socket.on('ping', (id) => {
        console.log('ping...', id)
    })
});

app.use(cors())
app.use(Authenticate)
app.get('/', (req, res) => {
    console.log('Index....')
    res.send('Hello World!!')
})

httpServer.listen(3001);